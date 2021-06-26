const server = require('express').Router();
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const { Product, Category, Image } = require('../db.js');
const { isAdmin } = require('../middleware/customMiddleware');

server.post('/', (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    rating,
    size,
    pathProduct,
    pathCard,
    nameImage,
  } = req.body;
  console.log('RUTA REQ BODY', req.body);
  Product.findOrCreate({
    where: {
      name: name,
      description: description,
      price: price,
      stock: stock,
      size: size,
      thumbnail: pathCard + nameImage,
    },
  })
    .then((product) => {
      console.log(
        'PRODUCT RUTA CREATE NEW',
        JSON.stringify(product, undefined, 4)
      );
      Image.create({
        path: pathProduct + nameImage,
        productId: product[0].id,
      })
        .then((image) => {
          //res.status(201).send(product);
          res.status(201).send(product);
          console.log('Imege ok', image);
        })
        .catch((err) => {
          return res.send({ data: err }).status(400);
        });
    })
    .catch((err) => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});

server.get('/', (req, res) => {
  Product.findAll({
    include: [
      {
        model: Category,
      },
    ],
  })
    .then((products) => {
      console.log('Esto es la ruta-------->', products);
      res.json(products).status(200);
    })
    .catch((error) => {
      return res.status(400).send({ data: error });
    });
});

server.get('/search', (req, res) => {
  const stringQuery = req.query.query;
  Product.findAndCountAll({
    where: {
      [op.or]: [
        {
          name: {
            [op.iLike]: '%' + stringQuery + '%',
          },
        },
        {
          description: {
            [op.iLike]: '%' + stringQuery + '%',
          },
        },
      ],
    },
    include: [
      {
        model: Category,
      },
    ],
  })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      return res.status(400).send({ data: error });
    });
});

server.get('/:id', (req, res) => {
  const id = req.params.id;
  Product.findOne({
    where: { id: id },
    include: [
      {
        model: Category,
      },
      {
        model: Image,
      },
    ],
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      return res.status(400).send({ data: error });
    });
});

server.post('/:idProducto/category/:idCategoria', isAdmin, (req, res) => {
  const { idProducto, idCategoria } = req.params;

  console.log('LLEGUE');

  Product.findByPk(idProducto).then((oneProduct) => {
    Category.findByPk(idCategoria)
      .then((newcategory) => {
        oneProduct.addCategory(newcategory);
      })
      .then((product) => {
        return res.status(201).json(product);
      })
      .catch((error) => {
        return res.status(400).send({ data: error });
      });
  });
});


server.delete('/:idProducto/category/:idCategoria', (req, res) => {
  const { idProducto, idCategoria } = req.params;

  Product.findByPk(idProducto).then((oneProduct) => {
    Category.findByPk(idCategoria)
      .then((oldcategory) => {
        oneProduct.removeCategory(oldcategory);
      })
      .then(() => {
        return res.status(201).send('Category deleted');
      })
      .catch((error) => {
        return res.status(400).send({ data: error });
      });
  });
});

server.put('/:id', isAdmin, (req, res) => {
  const id = req.params.id;
  const { name, description, price, stock } = req.body;
  Product.update(
    {
      name: name,
      description: description,
      price: price,
      stock: stock,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((confirmation) => {
      if (confirmation[0] === 0) {
        // el id recibido es correcto?
        return res.send({ data: 'Product not found!' }).status(400);
      }
      return res.send('Product Updated');
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.delete('/:id', isAdmin, (req, res) => {
  //en postman poner /products/1, pero acá no porque viene desde index routes //
  let id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((id) => {
      if (id === id) {
        res.status(200).send('Product deleted');
      } else {
        res.send('Product not found');
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

server.get('/category/:category', (req, res) => {
  console.log('ESTOY DESDE AQUI');
  const category = req.params.category;
  Category.findOne({
    where: {
      name: category,
    },
  })
    .then((categoryAll) => {
      let categoryId = categoryAll.id;
      return Product.findAll({
        include: [
          {
            model: Category,
            where: {
              id: categoryId,
            },
          },
        ],
      });
    })
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      return res.status(400).send({ data: error });
    });
});

module.exports = server;
