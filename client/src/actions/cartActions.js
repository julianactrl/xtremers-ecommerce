import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  ORDER_LINE_BY_ID,
  ORDER_LINE_BY_ID_SUCCESS,
  ORDER_LINE_BY_ID_ERROR,
  REMOVE_ORDER_LINE_BY_ID,
  REMOVE_ORDER_LINE_SUCCESS,
  CHANGE_QUANTITY_PRODUCT_LINE,
  CHANGE_QUANTITY_PRODUCT_LINE_SUCCESS,
  CHANGE_QUANTITY_PRODUCT_LINE_SUCCESS_REST,
  CHANGE_QUANTITY_PRODUCT_LINE_REST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_REQUEST,
  ADD_ORDER_ERROR,
  REMOVE_ORDER_LOADING,
  REMOVE_ORDER_SUCCESS,
  REMOVE_ORDER_ERROR,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CHANGEQTY_ITEM,
  CART_REMOVE_TOTAL,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL 
} from '../constants/cartConstants';

import { BEARER } from '../constants/bearerConstants';

const url = 'http://localhost:3001/';

export const getOrderline = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LINE_BY_ID });

    const { data } = await axios.get(`${url}users/${id}/cart`);

    dispatch({
      type: ORDER_LINE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LINE_BY_ID_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeOrderLine = (productId, userId) => async (dispatch) => {
  dispatch({ type: REMOVE_ORDER_LINE_BY_ID });

  const { data } = await axios.delete(
    `${url}users/${userId}/cart/${productId}`
  );

  console.log('salio todo bien', data);
  console.log(
    '--------------------------------------------------------------------',
    productId
  );
  dispatch({
    type: REMOVE_ORDER_LINE_SUCCESS,
    payload: productId,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const changeQuantityProductLine = (userId, updates) => async (
  dispatch
) => {
  dispatch({ type: CHANGE_QUANTITY_PRODUCT_LINE });
  console.log(userId, updates);
  const { data } = await axios.put(`${url}users/${userId}/cart`, updates);
  console.log(
    '-----------------------------------------------------------------------------------------------------------------------------------',
    updates
  );
  dispatch({
    type: CHANGE_QUANTITY_PRODUCT_LINE_SUCCESS,
    updates,
  });
};

export const changeQuantityProductLineRest = (actionquantity, userId) => async (
  dispatch
) => {
  dispatch({ type: CHANGE_QUANTITY_PRODUCT_LINE });

  const { data } = await axios.put(
    `${url}users/${userId}/cart`,
    actionquantity
  );
  console.log(
    '-----------------------------------------------------------------------------------------------------------------------------------',
    actionquantity
  );
  dispatch({
    type: CHANGE_QUANTITY_PRODUCT_LINE_SUCCESS,
    payload: actionquantity,
  });
};

export const addOrder = (idUser, body) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ORDER_REQUEST });

    console.log('ESTOY EN ACCTION');
    console.log('BODY --->', body);

    const { data } = await axios.post(`${url}orders/${idUser}/cart`, body);
    //console.log(data);

    dispatch({
      type: ADD_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

    export const removeOrderRegister = (idUser) => async (dispatch) => {
        try {
            dispatch({ type: REMOVE_ORDER_LOADING})
            const { data } = await axios.delete(`${url}users/${idUser}/cart`)

            dispatch({
                type: REMOVE_ORDER_SUCCESS,
                payload: data,
            })
        } catch(error) {
            dispatch({
                type: REMOVE_ORDER_ERROR,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
        }
    };

  export const addOrderLocal = (id, quantity, subtotal) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`${url}products/${id}`);
  console.log('En action data', data);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: {
        idProduct: data.id,
        name: data.name,
        price: data.price,
        stock: data.stock,
      },
      quantity,
      subtotal,
    },
  });
  console.log('esto es getstate------>', getState().cart2.cartItems);
  localStorage.setItem('cartItems', JSON.stringify(getState().cart2.cartItems));
};

export const changeQtyLocal = (id, quantity, subtotal) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`${url}products/${id}`);
  console.log('En action data', data);
  dispatch({
    type: CART_CHANGEQTY_ITEM,
    payload: {
      product: {
        idProduct: data.id,
        name: data.name,
        price: data.price,
        stock: data.stock,
      },
      quantity,
      subtotal,
    },
  });
  console.log('esto es getstate------>', getState().cart2.cartItems);
  localStorage.setItem('cartItems', JSON.stringify(getState().cart2.cartItems));
};

export const removeOrderTotal = () => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_TOTAL,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart2.cartItems));
};

export const removeOrderLocal = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart2.cartItems));
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_LIST_REQUEST });

    axios.defaults.headers.common = BEARER()

    const { data } = await axios.get(`${url}orders/`);
    console.log(data);

    dispatch({
      type: ORDERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

