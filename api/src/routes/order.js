const server = require('express').Router();
const { Order, User, Product, Orderline } = require('../db.js');
const { isAuthenticated, isAdmin } = require('../middleware/customMiddleware');
const { toIsoStringOffset, delayedDays, sendMail } = require('../../utils/email.js');
const { mailOrderCompleted, mailOrderInProcess } = require('../../utils/mails');

const { ACCESS_TOKEN_MP_PROD, FRONT, BACK, NG_ROK } = process.env;
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const { body } = require('express-validator');


//Cuenta a la que hacemos referencia como vendedor
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP_PROD
});





// ------- Rutas para MercadoPago------------------//

server.post('/mercadopago', async(req, res) => {
 

  try {

    const {orderId, userId, order_email, order_adress, total} = req.body
    const orderDate = new Date();
    

    await Order.findOne({
                  include: [
                    {
                      model: Orderline,
                      include: [
                        {
                          model: Product
                        }
                      ]
                    },
                    
                  ],
                  where: {
                    id: orderId,
                    userId: userId,
                    order_status: 'cart'
                  },
                }).then(async order => { 
                //actualizo la orden con los datos que me llegan por body
                  order.update({ 
                    order_email: order_email,
                    order_date: orderDate,
                    order_adress: order_adress,
                    total: total,
                    order_status: "created",
                  });

                  let expiryDate = delayedDays(new Date(), 4);

                  let preference = {
                    items: order.orderlines.map(orderline => ({
                      title: orderline.product.name,
                      unit_price: orderline.product.price,
                      quantity: orderline.quantity,
                    })),
                    back_urls: {
                      success: `${BACK}/orders/mercadoPagoRedirect`,
                      failure: `${BACK}/orders/mercadoPagoRedirect`,
                      pending: `${BACK}/orders/mercadoPagoRedirect`
                    },
                    auto_return: "approved",
                    notification_url: `${NG_ROK}/orders/mercadoPagoNotifications`,
                    expires: true,
                    expiration_date_to: toIsoStringOffset(expiryDate)
                  };
                  
                  const resp = await mercadopago.preferences.create(preference)
                  //actualizo la orden con los datos de mercado pago
                  order.update({ mp_id: resp.response.id, payment_link: resp.body.init_point })
                  //disminuir el stock
                   order.orderlines.map(orderline => {
                    orderline.product.update({stock: orderline.product.stock - orderline.quantity})
                  })
                  
                  mailOrderInProcess(order);
                  
                  return res.json(order.payment_link)

                }).catch((err) => {
                  console.log(err);
                  return res.status(500).json({ message: "Internal server error" })
                })


  } catch (error) {
    console.log(error)
    res.send(error)
  }
 
});

server.get('/mercadoPagoRedirect', async (req, res) => {

  try {
    //console.info("En la ruta de mercadoPagoRedirect", req)

    const payment_id = req.query.payment_id;
    const payment_status = req.query.status;

    console.log('REQ mercadoPagoRedirect', req.query)

    //console.log('Payment Status mercadoPagoRedirect', payment_status);
    const order = await Order.findOne({
      
      where: {
        mp_id: req.query['preference_id']
      }
    })

    console.log('ORDER mercadoPagoRedirect', order)


    switch (order.order_status || order.order_status === null) {
      case 'completed': {
        //al profile de su orden
        return res.redirect(`${FRONT}/Orderdetails`)
      }
      case 'processing': {
        //profile de su orden
        return res.redirect(`${FRONT}/Orderdetails`)
      }
      case 'canceled': {
        //al profile de su orden
        return res.redirect(`${FRONT}/Orderdetails`)
      }
      default:
        //al profile de su orden
        return res.redirect(`${FRONT}/Orderdetails`)
    }
  } catch (err) {
    console.log(err)
  }
});

server.post('/mercadoPagoNotifications', async (req, res) => {

	res.sendStatus(200);
	//console.log('mercadoPagoNotifications',req.query)
	//console.log('mercadoPagoNotifications',req.body)
  //console.log('mercadoPagoNotifications',req.query.type)
	try {
		if (req.query.type === 'payment') {
			const payment = await mercadopago.payment.get(req.query['data.id']);
      //console.log('pyment mercadoPagoNotifications', payment)
      console.log('payment body status', payment.body.status)

			switch (payment.body.status) {

        /**************************CASO REJECTED*******************************/
        case 'rejected': {

          console.log('rejected')
          //aumentar el stock ?? puede volver a pagar con otra tarjeta
          //console.log('Entre a rejected')
          const merchant = await mercadopago.merchant_orders.get(payment.body.order.id);
          console.log('MERCHANT', merchant)
					const order = await Order.findOne({
            include: [
              {
                model: Orderline,
                include: [
                  {
                    model: Product
                  }
                ]
              },
              
            ],
						where: { mp_id: merchant.body["preference_id"] },
					})
          //cancelled o en proceso??
          const updateStock = await order.orderlines.map(orderline => {
            orderline.product.update({stock: orderline.product.stock + orderline.quantity})
          })
					const updatedOrder = await order.update({ order_status: 'cancelled', payment_link: null })
          

          return console.log('ORDER ACTUALIZADA A CANCELADA-->', JSON.stringify(updatedOrder, undefined, 4));


        }

       /**************************CASO APPROVED*******************************/
				case 'approved': {

          console.log('approved')
					const merchant = await mercadopago.merchant_orders.get(payment.body.order.id);
          console.log('MERCHANT', merchant)

          const order = await Order.findOne({
            include: [
              {
                model: Orderline,
                include: [
                  {
                    model: Product
                  }
                ]
              },
              
            ],
            where: { mp_id: merchant.body["preference_id"] },
          })
				
          if (order.order_status === 'cancelled') {
           //se disminuye el stock ya que en el caso rejected se aumento, esto ocurre cuando el cliente elije pagar
           //con otro medio de pago y es aceptado
            const updateStock = await order.orderlines.map(orderline => {
            orderline.product.update({stock: orderline.product.stock - orderline.quantity})
          });

            const updatedOrder =  await order.update({ order_status: 'completed', payment_link: null })
            return  console.log('ORDER ACTUALIZADA A COMPLETADA-->', JSON.stringify(updatedOrder, undefined, 4))

          } else {

            const updatedOrder = await order.update({ order_status: 'completed', payment_link: null })
            return  console.log('ORDER ACTUALIZADA A COMPLETADA-->', JSON.stringify(updatedOrder, undefined, 4))

          }
          

          /**AQUI VA ENVIO DE CORREO */
					//mailOrderCompleted(updatedOrder, productSerial);
				}

        /**************************CASO FAILURE*******************************/
        case 'failure': {
          console.log('failure')
          //aumentar el stock
          console.log('MERCHANT', merchant)
          const merchant = await mercadopago.merchant_orders.get(payment.body.order.id);
					const order = await Order.findOne({
						where: { mp_id: merchant.body["preference_id"] },
					})
					const updatedOrder = await order.update({ order_status: 'cancelled', payment_link: null })
          return console.log('ORDER ACTUALIZADA A CANCELLED-->', JSON.stringify(updatedOrder, undefined, 4));

        }

        /**************************CASO PENDING*******************************/
        case 'pending': {
          //este caso es pendiente de pago
          console.log('pending')
          const merchant = await mercadopago.merchant_orders.get(payment.body.order.id);
          console.log('MERCHANT', merchant)
					const order = await Order.findOne({
						where: { mp_id: merchant.body["preference_id"] },
					})
          //pasarla a en proceso para despues nosotros completarla una vez que el cliente da su ok
					const updatedOrder = await order.update({ order_status: 'processing'})
          return console.log('ORDER ACTUALIZADA A PROCESSING-->', JSON.stringify(updatedOrder, undefined, 4));

        }

        case 'in_process': {

          //este caso es pendiente de pago
          console.log('in_process')
          const merchant = await mercadopago.merchant_orders.get(payment.body.order.id);
          console.log('MERCHANT', merchant)
					const order = await Order.findOne({
						where: { mp_id: merchant.body["preference_id"] },
					})
          //pasarla a en proceso para despues nosotros completarla una vez que el cliente da su ok
					const updatedOrder = await order.update({ order_status: 'processing'})
          return console.log('ORDER ACTUALIZADA A PROCESSING-->', JSON.stringify(updatedOrder, undefined, 4));

        }



			}
		}
	} catch (err) {
		console.log('error ', err)
	}
});

// server.get('/', isAuthenticated, (req, res, next) => {
//   Order.findAll({
//     include: [
//       {
//         model: User,
//       },
//     ],
//   })
//     .then((orders) => {
//       return res.send(orders).status(200);
//     })
//     .catch((err) => {
//       return res.send({ data: err }).status(400);
//     });
// });

server.get('/', isAuthenticated, (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: User,
      },{
        model: Orderline,
        include: [
          {
            model: Product
          }
        ]
      }
    ],
  })
    .then((orders) => {
      return res.send(orders).status(200);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.get('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  Order.findAll({
    where: {
      id: id,
    },
  })
    .then((orders) => {
      console.log(orders);
      const orderId = orders;
      if (orderId) {
        return res.status(200).json(orders);
      }
      return res.status(400).send('Order not found!');
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});



server.put('/:id', isAdmin, (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;
  Order.update(
    {
      order_status: status,
    },
    { where: { id: id } }
  )
    .then((value) => {
      const result = value[0];
      if (result) {
        return res.status(202).send('Element updated');
      }
      return res.status(400).send('Order not found!');
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.delete('/:id', (req, res) => {
  const { id } = req.params;
  Order.findOne({
    where: {
      id: id,
    },
  })
    .then((order) => {
      order.destroy();
      res.send('Order Deleted');
    })
    .catch((err) => res.send({ data: err }).status(400));
});

server.post('/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await Order.findAll({
      where: {
        order_status: status,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    if (orders) res.send(orders);
  } catch (err) {
    return res.send({ data: err }).status(400);
  }
});

server.put('/checkout/:id', (req, res) => {
  const { state, totalPrice } = req.body;
  const { id } = req.params;
  console.log('cambio estado carrito', req.body);
  Order.update(
    {
      order_status: state,
      total: totalPrice,
    },
    { where: { id: id } }
  )
    .then((value) => {
      console.log('result', value);
      const result = value[0];
      if (result) {
        return res.status(202).send('Element updated');
      }
      return res.status(400).send('Order not found!');
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.post('/:idUser/cart', async (req, res, next) => {
  const { idUser } = req.params;

  try {
    let sinStock = [];
    let orden = await Order.findOne({
      where: { userId: idUser, status: 'On Cart' },
    });
    if (orden) await orden.destroy();
    orden = await Order.create({
      userId: idUser,
    });

    // Itera sobre cada {} de orderlines enviado del carrito del front del usuario
    await req.body.forEach(async (orderline) => {
      const { productId, quantity, amount } = orderline;
      //asocia la orderline a la orden 'On Cart'
      const producto = await Product.findOne({ where: { id: productId } });

      // if ((producto.stock - quantity) < 0) {
      //   sinStock.push(orderline)
      //   return
      // }

      await orden.addProducts(productId, {
        through: { quantity: quantity, amount: amount },
      });

      return sinStock;
    });

    await res.status(200).json([orden, sinStock]);
  } catch (error) {
    console.log(error);
    new Error(error);
  }

  next();
});

//----------------------Ruta para agregar order -----------------------------//
server.post('/:idUser/cart', async (req, res) => {
  try {
    const { idUser } = req.params;
    const { quantity, productId } = req.body;

    // const order = await Order.findOrCreate({
    //   where: { userId: idUser, order_status: "cart" },
    // });

    const user = await User.findByPk(idUser);
    const product = await Product.findByPk(productId);

    product.stock = product.stock - quantity;
    //const productSave = await product.save();
    const total = quantity * product.price;
    const userEmail = user.email;
    const date = new Date();

    const order2 = await Order.create({
      order_email: userEmail,
      order_date: date,
      order_adress: user.adress,
      order_status: 'cart',
      total: total,
      userId: idUser,
    });
    return res.status(200).send(order2);
  } catch (error) {
    return res.status(400).send({ data: error });
  }
});

// ------- Ruta para retornar las orderlines de una orden particular------------------//

server.get('/orders/:id/cart', async (req, res, next) => {
  const { id } = req.params;

  Order.findOne({
    where: { id },
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'name',
          'availability',
          'stock',
          'image',
          'price',
          'count',
        ],
        through: {
          attributes: ['amount', 'quantity'], // agregar 'id' si se quiere obtener el id de la orderline
        },
      },
      {
        model: User,
        attributes: [
          'name',
          'last_name',
          'email',
          'adress',
          'phone',
          'password',
          'birth_date',
          'region_id',
          'country_id',
          'role',
          'dni',
        ],
      },
    ],
    group: Orderline.id,
  })

    .then((carrito) => {
      res.status(200).send(carrito);
    })
    .catch((err) => {
      console.log(err.sql);
      res.sendStatus(404);
    });
});



module.exports = server;
