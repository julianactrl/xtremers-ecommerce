import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderline } from "../../../actions/cartActions";
import {getReviews} from '../../../actions/productActions'
import jwt from "jsonwebtoken";
import axios from "axios";
import Modal from "react-modal";
import ReviewForm from "../../Reviews/ReviewForm";

const Order_details = () => {
  const dispatch = useDispatch();
  const user = jwt.decode(JSON.parse(localStorage.getItem("userInfo")));
  console.log('USER', user)
  const [userInfo, setUserInfo] = useState({});


  const getOrderDetails = async (user) => {
    const infoUser = await axios.get(`http://localhost:3001/users/${user.id}`);
    setUserInfo(infoUser.data);
    console.log(user.id);
    dispatch(getOrderline(user.id));
  };



  const [modalIsOpen, SetModalIsOpen] = useState(false);
  const order = useSelector((state) => state.cart.order);
  console.log('ORDER', order)
  const reviews = useSelector((state) => state.product.list);
  console.log('REVIEWS', reviews)
  console.log(order)
  useEffect(() => {
    getOrderDetails(user);
  }, []);



const mapProductId =(order) =>{
    if(order){
        console.log('bien')
    order.map(orderline =>
        dispatch(getReviews(orderline.product.id) ))}else{

            console.log('tonto')
        }
}




useEffect(() =>{
  if(order){
 mapProductId(order.orderlines)}
},[order])


  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  return (
    
      <div class="container mx-auto px-4 sm:px-8 max-w-3xl">
       
        <div class="py-8">
          <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 class="text-2xl leading-tight">ORDERS DETAILS</h2>
            <div class="text-end"></div>
          </div>
  
         
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                  {/* <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      USER
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      ID
                    </th> */}
                    <th
                      scope="col"
                      class="px-10 py-5 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      PRODUCTS
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      ORDER DATE
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      QUANTITY
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      TOTAL
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      STATUS
                    </th>
                    
                  </tr>
                </thead>
  
                {order === null ? (
                  <div class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {" "}
                    No orders
                  </div>
                ) : (
                      order.length > 0 && 
                      order.map((ordere) => ordere == null ? null :(  
                    <>
                      <tbody>
                        <tr>
                        {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                             USER NAME
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              USER ID
                            </p>
                          </td> */}
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                           
                            
                              { ordere.orderlines && ordere.orderlines.map((orderline) => (
                                
                              <div class="flex items-center">
                              <div class="flex-shrink-0">
                                <a href="#" class="block relative">
                                  <img
                                    src={orderline.product.thumbnail}
                                    alt="profil"
                                    class="mx-auto object-cover rounded-full h-10 w-10 "
                                  />
                                </a>
                              </div>
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                {orderline.product.name}
                                </p>
                              </div>
                              <div class="ml-3">

                              {
                                ordere.order_status == "completed"  ?

                                  ordere.order_status == "completed" &&  reviews.map(review => review.productId == ordere.orderlines.productId).length > 0  ? null : (
                                <button  onClick={() => SetModalIsOpen(true)} class="relative inline-block px-3 py-1 font-semibold  bg-purple-300 text-purple-900 leading-tight hover:bg-green-100 hover:text-green-900  border-gray-200 rounded-full">
                                  <span
                                    aria-hidden="true"
                                    class="absolute inset-0  opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative text-center ">
                                    Add review
                                  </span>
                                </button>
                                ) :

                                
                                  null
                                
                              }
                              
                             
                              </div>
                            </div>
                            ))}
                                
                               
                        
                            
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                            {formatDate(ordere.order_date)}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          { ordere.orderlines && ordere.orderlines.map((orderline) => (
                            
                              <div class="flex items-center">
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  {orderline.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                                
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                            {ordere.total}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span class="relative">{ordere.order_status}</span>
                            </span>
                          </td>
                          
                        </tr>
                      </tbody>
                      <Modal isOpen={modalIsOpen}>
                        <div>
                          <div class="flex justify-end pt-2">
                            <button
                            onClick={() => SetModalIsOpen(false)}
                            class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-green-100 hover:text-green-900"
                            >
                            Close
                            </button>
                          </div>
                          <ReviewForm />
                        </div>
                    </Modal>
                    </>
                    ))
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Order_details;
