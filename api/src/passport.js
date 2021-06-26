const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db.js');
const jwt = require('jsonwebtoken');
const { SECRET, BACK, CLIENTID, CLIENTSECRET } = process.env;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async (email, password, done) => {
      console.log('PASSPORT--->', email, password);
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false);
      if (!user.compare(password)) return done(null, false);
      const { id, name, last_name, email: userEmail, photoURL, isAdmin } = user;
      return done(null, {
        id,
        name,
        last_name,
        email: userEmail,
        photoURL,
        isAdmin,
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, SECRET, function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENTID,
      clientSecret: CLIENTSECRET,
      callbackURL: `${BACK}/auths/googlecallback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = {
          name: profile.name.givenName || profile.displayName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          isAdmin: false,
          googleId: profile.id,
          photoURL: profile.photos[0].value.replace('s96-c', 's300-c'),
          password: null,
        };
        const foundUser = await User.findOne({ where: { email: user.email } });
        if (foundUser) {
          const updatedUser = await foundUser.update(user);
          done(null, updatedUser);
        } else {
          const createdUser = await User.create(user);
          done(null, createdUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
