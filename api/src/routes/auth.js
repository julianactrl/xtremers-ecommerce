const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { User } = require('../db.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { SECRET, FRONT } = process.env;
const { isAuthenticated } = require('../middleware/customMiddleware');

server.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

server.post('/register', async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    const { id, name, last_name, email, photoURL, isAdmin } = user;

    return res.send(
      jwt.sign(
        {
          id,
          name,
          last_name,
          email,
          photoURL,
          isAdmin,
        },
        SECRET
      )
    );
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
});

server.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) return next(err);
    else if (!user) return res.sendStatus(401);
    else return res.send(jwt.sign(user, SECRET));
  })(req, res, next);
});

// Promote an user
server.post('/:id/promote', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const userPromote = User.update(
    {
      isAdmin: true,
    },
    {
      where: { id: id },
    }
  );
  console
    .log('Este es user promote', userPromote)

    .then(() => {
      res.send('User has been Promoted').status(200);
    })
    .catch((err) => {
      res.send({ data: err }).status(500);
    });
});

//Google Auth

server.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

server.get(
  '/googlecallback',
  passport.authenticate('google'),
  function (req, res) {
    const {
      id,
      name,
      last_name,
      profile_pic,
      email,
      isAdmin,
      updatedAt,
    } = req.user.dataValues;
    const token = jwt.sign(
      {
        id,
        name,
        last_name,
        profile_pic,
        email,
        isAdmin,
        updatedAt,
      },
      SECRET
    );
    res.redirect(`${FRONT}/?userInfo=${token}`);
  }
);
//Facebook

server.get('/facebook', passport.authenticate('facebook'));

server.get(
  '/facebook/secret',
  passport.authenticate('facebook'),
  function (req, res) {
    const { id, name, isAdmin } = req.user.dataValues;
    const token = jwt.sign(
      {
        id,
        name,
        isAdmin,
      },
      SECRET
    );
    res.redirect(`${FRONT}/?jwt=${token}`);
  }
);

//logout
server.get('/logout', (req, res) => {
  req.logout();
  res.localStorage.removeItem('userInfo');
  res.status(200).send('User Logged out');
});

module.exports = server;
