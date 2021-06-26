const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const orderRouter = require('./order.js');
const userRouter = require('./user.js');
const reviewsRouter = require('./review.js');
const uploadRouter = require('./upload');
const authRouter = require('./auth.js');
const contactRouter = require('./contact.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewsRouter);
router.use('/uploads', uploadRouter);
router.use('/auths', authRouter);
router.use('/contacts', contactRouter);

module.exports = router;
