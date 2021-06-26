const server = require('express').Router();
const Sequelize = require('sequelize');
const { Product, Review, User } = require('../db.js');

server.post('/product/:idProducto/add', (req, res) => {
  //POSTMAN REVIEWS/PRODUCT/:IDPRODUCTO
  const { idProducto } = req.params;
  const { userId, rate, content, date, status } = req.body;
  console.log('Review-----', userId, rate, content, date, status, idProducto);
  Review.create({
    rate: rate,
    content: content,
    date: date,
    status: status,
    productId: idProducto,
    userId: userId,
  })
    .then((review) => {
      res.status(200).json(review);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

server.get('/product/:id/reviews', (req, res) => {
  const id = req.params.id;
  Review.findAll({
    where: {
      productId: id,
    },
    include: {
      model: User,
    },
  })
    .then((review) => res.send(review))
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.delete('/:id', (req, res) => {
  const { id } = req.params;
  Review.destroy({
    where: {
      id: id,
    },
  })
    .then((review) => {
      if (review) {
        return res.send('Review Deleted');
      }
      return res.status(400).send({ data: 'Review not found!' });
    })
    .catch((err) => res.status(400).send({ data: err }));
});

//Revisar
server.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { usuarioId, rate, content, date, status, idProducto } = req.body;
  console.log('id', id);

  Review.update(
    {
      rate: rate,
      content: content,
      date: date,
      status: status,
      productId: idProducto,
      userId: usuarioId,
    },
    { where: { id: id } }
  )
    .then((value) => {
      const result = value[0];
      if (result) {
        return res.send('Element updated').status(202);
      }
      return res.send('Review not found!').status(400);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

module.exports = server;
