const server = require('express').Router();
const { Category } = require('../db.js');
const { isAdmin } = require('../middleware/customMiddleware');

server.get('/', (req, res, next) => {
  // find caategories
  Category.findAll()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.post('/', isAdmin, (req, res) => {
  //en postman poner /categories, pero acá no porque viene desde index routes //
  const { name, description } = req.body;

  Category.findOrCreate({
    where: { name: name, description: description },
  })
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => {
      //error de servidor
      return res.status(400).send({ data: err });
    });
});

server.delete('/:id', isAdmin, (req, res) => {
  //en postman poner /categories/1, pero acá no porque viene desde index routes //
  let id = req.params.id;
  Category.destroy({ where: { id: id } })
    .then((id) => {
      if (id === id) {
        res.status(200).send('Category deleted');
      } else {
        res.send('Category not found');
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

server.put('/:id', isAdmin, (req, res) => {
  let id = req.params.id;
  const { name, description } = req.body;
  Category.update(
    { name: name, description: description },
    { where: { id: id } }
  )
    .then((id) => {
      if (id === id) {
        res.status(200).send('Category updated');
      } else {
        res.send('Category not found');
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = server;
