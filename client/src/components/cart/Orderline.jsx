import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeOrderLocal,
  changeQtyLocal,
  changeQuantityProductLine,
  removeOrderLine,
} from "../../actions/cartActions";
import jwt from "jsonwebtoken";
import swal from "sweetalert";

const Orderline = (props) => {
  const user = jwt.decode(JSON.parse(localStorage.getItem("userInfo")));
  const orderCart = useSelector((state) => state.cart2.cartItems);
  
  
  const order = useSelector((state) => state.cart.order);

  console.log('ORDER', order)

  const orders = order.length > 0 ?  order.filter((order) => order.order_status == "cart") : []
  //const orderlines  = orders && orders !== null ? orders.orderlines : []
  console.log('FILTRO', orders)
  //console.log('ORDERLINES', orderlines)
  //console.log(orderlines);

  //const { orderlines } = order ? order : [];

  const dispatch = useDispatch();


  function handleChangeQuantity(e) {
    if (!user) {
      if (e.target.name == "suma") {
        const item = orderCart.find(
          (orderline) => orderline.product.idProduct == e.target.value
        );

        if (item.quantity < item.product.stock) {
          const quantity = parseInt(item.quantity) + 1;
          const subtotal = quantity * item.product.price;
          dispatch(changeQtyLocal(e.target.value, quantity, subtotal));
        } else {
          swal("NO HAY MAS STOCK");
        }
      }
      if (e.target.name == "resta") {
        const item = orderCart.find(
          (orderline) => orderline.product.idProduct == e.target.value
        );
        if (item.quantity > 1) {
          const quantity = parseInt(item.quantity) - 1;
          const subtotal = quantity * item.product.price;
          dispatch(changeQtyLocal(e.target.value, quantity, subtotal));
        } else {
          swal("no podes tener 0 item");
        }
      }
    } else {
      console.log(e.target.value);
      if (e.target.name === "suma") {
        const item = orders[0].orderlines.find(
          (orderline) => orderline.product.id == e.target.value
        );
        console.log(item);
        if (item.quantity < item.product.stock) {
          const quantity = parseInt(item.quantity) + 1;
          const subtotal = quantity * item.product.price;
          const orderlineid = item.id;
          const updates = {
            quantity,
            subtotal,
            orderlineid,
          };
          dispatch(changeQuantityProductLine(user.id, updates));
        }
      } else {
        const item = orders[0].orderlines.find(
          (orderline) => orderline.product.id == e.target.value
        );
        console.log(item);
        if (item.quantity > 1) {
          const quantity = parseInt(item.quantity) - 1;
          const subtotal = quantity * item.product.price;
          const orderlineid = item.id;
          const updates = {
            quantity,
            subtotal,
            orderlineid,
          };
          dispatch(changeQuantityProductLine(user.id, updates));
        }
      }
    }
  }




  function Remove(e) {
      if(!user){
      e.preventDefault();
      console.log(e.target.value);
      dispatch(removeOrderLocal(e.target.value));
    } else{

      dispatch(removeOrderLine(e.target.value,user.id))
    }
  }

  if (user) {
    return (
      <>
        {orders.length > 0 &&
          orders[0].orderlines.map((orderline) => (
            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img class="h-24" src={orderline.product.thumbnail} alt="Image not found" />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">
                    {orderline.product.name}
                  </span>

                  <button
                    onClick={Remove}
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    value={orderline.product.id}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <button
                  onClick={handleChangeQuantity}
                  name="resta"
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                  value={orderline.product.id}
                >
                  {" "}
                  -{" "}
                </button>

                <input
                  class="mx-2 border text-center w-8"
                  type="text"
                  value={orderline.quantity}
                />

                <button
                  onClick={handleChangeQuantity}
                  name="suma"
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                  value={orderline.product.id}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">
                $ {orderline.product.price}
              </span>
              <span class="text-center w-1/5 font-semibold text-sm">
                $ {orderline.subtotal}
              </span>
            </div>
          ))}{" "}
      </>
    );
  } else {
    return (
      <>
        {
          orderCart && orderCart.map((element) => (
            
            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 rounded-md">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img class="h-24" src={element.product.thumbnail} alt="Image not found" />
                  
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">{element.product.name}</span>
                  {/*^localProduct.product.name*/}

                  <button
                    onClick={Remove}
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    value={element.product.idProduct}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {/* boton abajo -----> onClick={handleRestQuantity}*/}
              <div class="flex justify-center w-1/5">
                <button
                  value={element.product.idProduct}
                  name="resta"
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                  onClick={handleChangeQuantity}
                >
                  {" "}
                  -{" "}
                </button>

                {/*qtyLineLocal*/}
                <input
                  class="mx-2 border text-center w-8"
                  type="text"
                  value={element.quantity}
                />

                <button
                  name="suma"
                  value={element.product.idProduct}
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                  onClick={handleChangeQuantity}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">
                $ {element.product.price}
              </span>
              {/*   ----> $ ---->  subtotalLineLocal*/}
              <span class="text-center w-1/5 font-semibold text-sm">
                {element.subtotal}
              </span>
            </div>
          ))}
      </>
    );
  }
};

export default Orderline;
