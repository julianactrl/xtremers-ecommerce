import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import login from '../../actions/userActions';
import { addOrder } from '../../actions/cartActions';
import { removeOrderTotal } from '../../actions/cartActions';
import jwt from 'jsonwebtoken';
import Orderline from "../cart/Orderline";
import { saveShippingAddress } from '../../actions/cartActions';
import Steps from './Steps'


const Step2 = ({ history }) => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [email, setEmail] = useState(shippingAddress.email)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch();

    const user = jwt.decode(JSON.parse(localStorage.getItem('userInfo')));

    const order = useSelector((state) => state.cart.order);
    console.log('SOY ORDER DE CHECKOUT', order)




    var totalBase = 0;
    // se ejecuta para actualizar el precio del cart
    useEffect(() => {
        const caculadortotalBase = () => {
            if (user) {
                if (order) {
                    order.orderlines && order.orderlines.map(or => {

                        totalBase = totalBase + or.subtotal
                    })
                } else {
                    totalBase = 0;
                }
            }
        }
    }, [order])



    //usa un modal para el login
    //   const openLoginModal = () => {
    // 		dispatch(openLogin(true))
    // 	}

    // Se ejecuta el submit handler, guarda la shipping Address y pasa al siguiente paso
    const submitHandler = (e) => {
        e.preventDefault()
        console.log("me ejecute")
        dispatch(saveShippingAddress({ address, city, email, postalCode, country }))

        history.push('/payment')
    }


    return (


        <>

            <div>
                <div>
                    
                    <div>
                        {/* <h2 className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2">Order details </h2> */}

                        <form >
                            <Steps step1 step2 step3 />
                            <div
                            //onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="flex max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden lg:max-w-2xl mt-5 border-t-2" >

                                    <div className="w-full py-8 px-6 md:px-8 ">
                                        <h1 className="text-2xl font-semibold text-gray-700  text-center">Shipping</h1>
                                        <div className="flex justify-center mt-5">
                                        <p className="block text-gray-600 text-md font-medium mb-2 ">Hello <span className="font-semibold">{user.name}</span> please complete your </p>
                                        </div>

                                        <div className="min-w-min  py-8 px-6 md:px-8 ">
                                            {/**FORMULARIO */}
                                            <form
                                                onSubmit={(e) => submitHandler(e)}>
                                                <div className="mt-4">
                                                    <label
                                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                    >
                                                        Email
                                                     </label>
                                                    <input
                                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                        type='text'
                                                        placeholder='Enter an email'
                                                        value={email}
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}

                                                    // ref={watch({ required: true, max: 8 })}
                                                    />
                                                    <span class="block text-red-700 sm:inline">
                                                        {/* {errors.adress && "Adress is required"} */}
                                                    </span>
                                                </div>
                                                <div className="mt-4">
                                                    <label
                                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                    >
                                                        Adress
                                                     </label>
                                                    <input
                                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                        type='text'
                                                        placeholder='Enter address'
                                                        value={address}
                                                        required
                                                        onChange={(e) => setAddress(e.target.value)}

                                                    // ref={watch({ required: true, max: 8 })}
                                                    />
                                                    <span class="block text-red-700 sm:inline">
                                                        {/* {errors.adress && "Adress is required"} */}
                                                    </span>
                                                </div>

                                                <div className="mt-4">
                                                    <label
                                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                    >
                                                        City
                            </label>
                                                    <input
                                                        type='text'
                                                        placeholder='Enter city'
                                                        value={city}
                                                        required
                                                        onChange={(e) => setCity(e.target.value)}
                                                        // value={product.description}
                                                        // onChange={handleInputChange}

                                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"


                                                    />
                                                    {/* <span class="block text-red-700 sm:inline">{errors?.name?.message}</span> */}
                                                </div>
                                                <div className="mt-4">
                                                    <label
                                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                    >
                                                        Postal Code
                            </label>
                                                    <input
                                                        type='text'
                                                        placeholder='Enter postal code'
                                                        value={postalCode}
                                                        required
                                                        onChange={(e) => setPostalCode(e.target.value)}
                                                        // aria-label="Price USD"
                                                        // value={product.price}
                                                        // onChange={handleInputChange}
                                                        // ref={watch({
                                                        //     required: "Enter a number",
                                                        //     pattern: {
                                                        //         value: /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/,
                                                        //         message: "Entered value does not match number format"
                                                        //     }
                                                        // })}
                                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                    />
                                                    <span class="block text-red-700 sm:inline">
                                                        {/* {errors.price && "Price Required"} */}
                                                    </span>
                                                </div>
                                                <div className="mt-4">
                                                    <label
                                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                    >
                                                        Country
                            </label>
                                                    <input
                                                        type='text'
                                                        placeholder='Enter country'
                                                        value={country}
                                                        required
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        // aria-label="Stock"
                                                        // value={product.stock}
                                                        // onChange={handleInputChange}
                                                        // ref={watch({
                                                        //     required: "Enter a number",
                                                        //     pattern: {
                                                        //         value: /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/,
                                                        //         message: "Entered value does not match number format"
                                                        //     }
                                                        // })}
                                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                    />
                                                    <span class="block text-red-700 sm:inline">
                                                        {/* {errors.stock && "Stock is required"} */}
                                                    </span>
                                                </div>

                                                <div className="mt-8 flex justify-center">
                                                    <Link to="/payment">
                                                    <button type='submit' className="bg-gray-700 text-white py-2 px-4 min-w-min tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                                        Submit
                                                        </button>
                                                    </Link>
                                                </div>
                                            </form>



                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Step2;