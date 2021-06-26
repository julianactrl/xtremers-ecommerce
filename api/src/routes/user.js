const server = require('express').Router();
const {
  User,
  Product,
  Order,
  Category,
  Orderline,
  Review,
  Image,
} = require('../db');
const { isAuthenticated, isAdmin } = require('../middleware/customMiddleware');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;

//----------------------Ruta para traer todos los usuarios------------//
server.get('/', isAdmin, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const result = await User.findAll();
      res.json(result);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

server.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

//----------------------Ruta para agregar un usuario -------------------//
server.post('/', async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

//----------------------Ruta para editar un usuario  -------------------------/
server.put('/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;

  const {
    email,
    password,
    isAdmin,
    name,
    last_name,
    phone,
    birdh_date,
    adress,
    googleId,
    photoURL,
  } = req.body;

  User.update(
    {
      email,
      password,
      isAdmin,
      name,
      last_name,
      phone,
      birdh_date,
      adress,
      googleId,
      photoURL,
    },
    {
      where: {
        id: id,
      },
    }
  ).then((modified) => {
    console.log(modified);
    if (modified[0] === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).send('Usuario modificado con exito');
  });
});

//-------Ruta para eliminar usuario-----//
server.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

//------Ruta para crear orderline------//
server.post('/:idUser/cart', async (req, res) => {
  try {
    console.log('LLEGO AQUU RUTA USER CREAR ORDER', req.body);
    const { idUser } = req.params;
    const { subtotal, quantity, productId } = req.body;
    const order = await Order.findOrCreate({
      where: { userId: idUser, order_status: 'cart' },
    });
console.log('-------------------------------------------------------------' , order)
    const product = await Product.findByPk(productId);
    console.log('RUTA_USER_PRODUCT---->', product);
    const productSave = await product.save();
    const orderline = await Orderline.create({
      subtotal: subtotal,
      quantity: quantity,
      orderId: order[0].dataValues.id,
      productId: productId,
      userId: idUser,
    });
    return res.status(200).send(orderline);
  } catch (error) {
    return res.status(400).send({ data: error });
  }
});

// --------- devuelve todas las  Orderlines en el Cart-----------------//
server.get('/:idUser/cart', (req, res) => {
  const { idUser } = req.params;
  Order.findAll({
    where: {
      userId: idUser,
    },
    include: [
      {
        model: Orderline,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  })
    .then((order) => {
      console.log(' estoy aqui--------', order);
      res.json(order).status(200);
    })
    .catch((err) => {
      res.send({ data: err }).status(400);
    });
});



//-----------------------ruta para editar las cantidades del carrito -----------------------//
server.put('/:userId/cart', async (req, res) => {
  // PUT /users/:idUser/cart
  const id = req.params.userId; // Me llega el userId desde el login.
  const { orderlineid, quantity, subtotal } = req.body; // Se trigerean desde el body los campos de la Orderline
  console.log('Esto es Id  de Oderline---->', orderlineid);
  try {
    // Acá se modificarán las cantidades (quantity) de esa orderline (orderlineid)
    const orderlineToChange = await Orderline.findByPk(orderlineid);
    console.log('ORDERTOCHANGE--------', orderlineToChange);
    const product = await Product.findOne({
      where: {
        id: orderlineToChange.productId,
      },
    });
    console.log(
      '----------------------------------------------------------------',
      orderlineToChange
    );
    if (quantity > product.stock) {
      return res.send(
        `You reached the maximun stock, you can buy till ${product.stock} items.`
      );
    }
    const updatedProduct = await product.save();
    orderlineToChange.quantity = Number(quantity);
    orderlineToChange.subtotal = Number(subtotal);
    orderlineToChange.save();
    console.log(subtotal);
    return res.send(orderlineToChange);
  } catch (err) {
    return res.send({ data: err }).status(400);
  }
});

//---------------------Vaciar el carrito-------------------------//
server.delete('/:idUser/cart', async (req, res) => {
  try {
    const { idUser } = req.params;
    const orderUser = await Order.findOne({
      where: { userId: idUser, order_status: 'cart' },
    });
    if (!orderUser) {
      return res.send('La orden para el usuario  ' + idUser + ',no fue encontrada');    
    }
     const orderline = Orderline.destroy({
      where: { orderId: orderUser.dataValues.id }
  })
    const orderDeleted = await orderUser.destroy();
    
    res.status(200).send('Cart is empty');
  } catch (error) {
    return res.status(400).send({ data: error });
  }
});

//----------------------Eliminar una orderLine------------------------//
server.delete('/:idUser/cart/:idProduct', (req, res) => {
  const idUser = req.params.idUser;
  const idProduct = req.params.idProduct;

  Orderline.findOne({
    where: {
      productId: idProduct,
    },
  }).then((orderline) => {
    if (!orderline) {
      res.send('La orden para el usuario ' + idUser + ', no fue encontrada');
      return;
    }
    Product.findOne({
      where: {
        id: idProduct,
      },
    }).then((product) => {
      let nuevoStock = product.stock + orderline.dataValues.quantity;
      Product.update(
        {
          stock: nuevoStock,
        },
        {
          where: { id: product.id },
        }
      );
    });

    Orderline.destroy({
      where: {
        productId: idProduct,
      },
    })
      .then(() => {
        return res.json('El item fue borrado');
      })
      .catch((error) => {
        return res.send(error).status(500);
      });
  });
});

server.post('/reset/password', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Bad request' });

  let reset_code = Math.random().toString().slice(2, 7);

  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD,
      },
    })
  );

  let mailOptions = {
    from: EMAIL_ACCOUNT,
    to: email,
    subject: 'Password Reset',
    text: "Here's your code to reset your password: " + reset_code,
  };

  User.update({ reset_code: reset_code }, { where: { email: email } }).then(
    (resp) => {
      if (!resp[0]) return res.status(404).json({ message: 'User not found' });

      let info = 'string';
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(400).json({ message: 'Mail could not be sent' });
        } else {
          res.status(200).json({ message: 'Code sent', ok: true });
        }
      });
    }
  );
});

server.post('/reset/verification', async (req, res) => {
  const { email, reset_code, step, password } = req.body;
  if (!email || !reset_code)
    return res.status(400).json({ message: 'Bad request' });

  try {
    var user = await User.findOne({ where: { email } });
    var match = await user.compare(reset_code, true);

    switch (step) {
      case '1':
        if (match) {
          return res.status(200).json({ message: 'Code accepted', ok: true });
        } else {
          return res.status(400).json({ message: 'Code denied' });
        }
      case '2':
        if (match) {
          if (!password)
            return res.status(400).json({ message: 'Bad request' });

          let updateRes = await user.update({ password, reset_code: null });
          if (updateRes) {
            console.log('---->', updateRes);
            console.log('---->', password);
            console.log('---->', reset_code);
            return res
              .status(200)
              .json({ message: 'Password changed successfully', ok: true });
          }
        } else {
          return res.status(400).json({ message: 'Bad request' });
        }
      default:
        return res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





//ruta cambio de roll


server.put('/:id/role',isAdmin, (req, res) => {
  const id = req.params.id;
  const {status} = req.body;
  console.log(status , id)
  User.update(
    {
      isAdmin: status,
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
        return res.send({ data: 'User not found!' }).status(400);
      }
      return res.send('User Updated');
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

module.exports = server;
