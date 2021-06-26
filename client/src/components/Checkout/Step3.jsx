import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePaymentMethod } from '../../actions/cartActions'
import Steps from './Steps'
//import jwt from 'jsonwebtoken';

const Step3 = ({ history }) => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    // si no hay shipping adress que redireccione a shipping adress
    // if (!shippingAddress.address) {
    //     history.push('/shipping')
    // }

    const [paymentMethod, setPaymentMethod] = useState('MercadoPago')

    const dispatch = useDispatch();

    // const user = jwt.decode(JSON.parse(localStorage.getItem('userInfo')));

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }




    return (//No cliente

        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5">
        <div class="md:flex">
            <div class="md:flex-shrink-0">
            <img class="h-48 w-full object-cover md:w-48" src="https://tercersector.org.ar/wp-content/uploads/2020/12/1589824324_logo_mercadopago.png" alt="Mercado pago"/>
            </div>
            <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Payment Method</div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Select Method</a>
            <form className="" onSubmit={submitHandler}>
            <input
                    className="bg-white border border-gray-300 rounded h-30 w-30 m-10" 
                    type='radio'
                    label='MercadoPago'
                    id='MercadoPago'
                    name='paymentMethod'
                    value='MercadoPago'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                 <button type='submit' class=" px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                     Click me
                    </button>
            </form>
                   
            
            </div>
        </div>
        </div>       

    )
}

export default Step3;