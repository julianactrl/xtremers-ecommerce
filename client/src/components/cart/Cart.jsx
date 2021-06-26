import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { removeOrderRegister } from "../../actions/cartActions";
import swal from "sweetalert";
import { useHistory } from 'react-router-dom'

//import { useReducer } from 'react';
import { getOrderline, removeOrderTotal } from "../../actions/cartActions";
import Orderline from "./Orderline";
import { Link } from "react-router-dom";

function Cart() {
  const history = useHistory()
  var total = 0;
  var totalBase = 0;
  //-------------------DATOS DEL LOCALSTORAGE------------------------->
  const user = jwt.decode(JSON.parse(localStorage.getItem("userInfo")));
  const orderCart = useSelector((state) => state.cart2.cartItems);
  console.log('SOY ORDERCART--------------------', orderCart)
  const order = useSelector((state) => state.cart.order);
  //-------------------REDUX ESTADOS --------------------------------->
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getOrderline(user.id));

    } else {

    }
  }, []);

  function handleRemoveTotalCart() {
    if (!user) {
      dispatch(removeOrderTotal());
    } else {
      dispatch(removeOrderRegister(user.id));
    }
  }

  const checkoutHandler = (e) => {
    history.push('/login?redirect=shipping')
  }

  function CalculatedTotalCost() {
    if (orderCart) {
      orderCart.map(orden => {
        total = total + parseInt(orden.subtotal)
      })
    } else {
      total = 0;
    }
    console.log("total fuera del map", total)
  }
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
  caculadortotalBase();
  CalculatedTotalCost();
  if (user) {
    return (
      <div>
        <div className="container mx-auto mt-10 ">
          <div className="flex shadow-md my-10 rounded-lg">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl"></h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>

                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  SubTotal
                </h3>
              </div>

              <Orderline />

              <a
                href="products"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </a>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5"></div>
              <div className="mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>${totalBase}</span>
                </div>

                <div className="flex justify-starts items-center mt-4">
                <Link to="/shipping">
                  <button type="button" onClick={((e) => checkoutHandler(e))} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mr-5">
                    Checkout
                  </button> 
                  </Link>

                  <button onClick={handleRemoveTotalCart} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ml-5">
                    Empty Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl"></h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  SubTotal
                </h3>
              </div>
              <Orderline idProduct={1} localStorage={true} />
              <a
                href="products"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </a>
            </div>
            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5"></div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>${total}</span>
                </div>

                <div className="flex justify-starts items-center mt-4">
                  <Link to="/shipping">
                  <button onClick={((e) => checkoutHandler(e))} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mr-5">
                  Checkout
                  </button>
                  </Link>

                <button
                  onClick={handleRemoveTotalCart}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mr-5"
                >
                  Empty Cart
                </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
