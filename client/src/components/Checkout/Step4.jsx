import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Steps from './Steps'
import jwt from "jsonwebtoken";
import { getOrderline, removeOrderTotal } from "../../actions/cartActions";
// import { ORDER_CREATE_RESET } from '../constants/orderConstants'
// import { USER_DETAILS_RESET } from '../constants/userConstants'
import { createOrder } from '../../actions/orderActions';
import swals from '../../utils/swals';
import axios from 'axios';


const Step4 = ({ history }) => {
    var total = 0;

    const dispatch = useDispatch()
    const user = jwt.decode(JSON.parse(localStorage.getItem("userInfo")));
    const cart = useSelector((state) => state.cart)
    const cartOrder = useSelector((state) => state.cart.order)

    const order = useSelector((state) => state.cart.order);

    console.log('ORDER', order)
  
    const orders = order.length > 0 ?  order.filter((order) => order.order_status == "cart") : null

    console.log('FILTRO', orders)
    //const orderlines  = orders && orders !== null ? orders.orderlines : []
    //console.log('FILTRO', orders)

    //const orderlines = useSelector((state) => state.cart.order.orderlines);
    //console.log('ORDERLINES', orderlines)


    console.log("soy cart--->", cart)
    const email = useSelector((state) => state.cart.shippingAddress.email)
    const address = useSelector((state) => state.cart.shippingAddress.address)
    const url = 'http://localhost:3001/';
    //const link = useSelector((state) => state.orderCreate.order)
    console.log("--->", address)
    // condition to go back
    if (!cart.shippingAddress.address) {
        history.push('/shipping')
    } else if (!cart.paymentMethod) {
        history.push('/payment')
    }


    function CalculatedTotalCost() {
        if (orders[0].orderlines) {
            orders[0].orderlines.map(orden => {
                total = total + parseInt(orden.subtotal)
            })
        } else {
            total = 0;
        }
        console.log("total fuera del map", total)

    }

    CalculatedTotalCost();

    //   Calculate prices
    // const addDecimals = (num) => {
    //     return (Math.round(num * 100) / 100).toFixed(2)
    // }

    // cart.itemsPrice = addDecimals(
    //     cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    // )
    // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    // cart.totalPrice = (
    //     Number(cart.itemsPrice) +
    //     Number(cart.shippingPrice) +
    //     Number(cart.taxPrice)
    // ).toFixed(2)

    const caculadortotal = () => {
        if (user) {
            if (cartOrder) {

                cartOrder.orderlines && cartOrder.orderlines.map(or => {

                    total = total + or.subtotal
                })
            } else {
                total = 0;
            }
        }

    }

    // caculadortotal();

    // si todo ok deberia crear /order.id
    // useEffect(() => {
    //     if (success) {
    //         history.push(`/order/${order._id}`)
    //         // dispatch({ type: USER_DETAILS_RESET })
    //         // dispatch({ type: ORDER_CREATE_RESET })
    //     }
    //     // eslint-disable-next-line
    // }, [history, success])



    const orderCreate = useSelector((state) => state.orderCreate)
    // const { order, success, error } = orderCreate

    //dispacha todo del cart esto deberia estar en la order del back
    //todo lo que viene del cart que quiero que este en la orden tiene que ser order o orderline?
    const placeOrderHandler = async(e) => {
        e.preventDefault();
        console.log('CART DESDE BOTON', cart)
        console.log('TOTAL DESDE BOTON', total)
        console.log("funcaa")
        
        
        
        const order = {
            orderId: orders[0].id,
            userId: orders[0].userId,
            order_email: email,
            order_adress: address,
            total: total,
            state: "created"
        }
        console.log('DATOS A MP', order)
        await swals.FIRE('warning', "After this step you cannot go back", 'Are you sure?',)
        
        dispatch(createOrder(order))

        const { data } = await axios.post(`${url}orders/mercadopago`, order);

        window.location.replace(data);

        // dispatch(clearCart());
    }
    console.log("soy shippingAddress", cart.shippingAddress.email)



    //         orderItems: cart.cartItems,
    //         shippingAddress: cart.shippingAddress,
    //         paymentMethod: cart.paymentMethod,
    //         itemsPrice: cart.itemsPrice,
    //         shippingPrice: cart.shippingPrice,
    //         taxPrice: cart.taxPrice,
    //         totalPrice: cart.totalPrice,

    return (
        <>

            <Steps step1 step2 step3 step4 />

            <div className="container mx-auto mt-10">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                        <span>{user.name}'s</span> order details
                    </h3>
                    <p className="text-lg leading-6 font-medium text-gray-900 text-center">
                        Details and information about your purchase.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                <h2>Shipping Address</h2>
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <p><strong>
                                    {address}, {cart.shippingAddress.city}{' '}
                                    {cart.shippingAddress.postalCode},{' '}
                                    {cart.shippingAddress.country}
                                </strong>
                                </p>
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Payment Method
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <p><strong>
                                    {cart.paymentMethod}
                                </strong>
                                </p>
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <p><strong>
                                    {email}
                                </strong>
                                </p>
                            </dd>
                        </div>

                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Products
                            </dt>
                            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                                {orders &&
                                    orders[0].orderlines.map((orderline) => (
                                        <>

                                            <span className="text-left font-bold text-sm">
                                                {orderline.product.name}
                                            </span>




                                            <span className="text-right w-1/5 font-semibold text-sm">
                                                ${orderline.product.price}
                                            </span>
                                        </>

                                    ))}

                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div id="summary" className="container mx-auto mt-10">
                <h1 className="font-semibold text-2xl text-center border-b pb-8 flex-shrink-0">
                    Order Summary
              </h1>
                <div className="mt-8">
                    <div className="flex font-semibold justify-center py-6 text-lg uppercase">
                        <span>Total cost <strong>${total}</strong></span>
                        <span></span>

                        <button type="button" onClick={((e) => placeOrderHandler(e))} className="ml-5 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Step4