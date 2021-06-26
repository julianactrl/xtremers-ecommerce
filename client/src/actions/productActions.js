import axios from 'axios';
import { toast } from "react-toastify";

import {
  PRODUCT_BY_ID_REQUEST,
  PRODUCT_BY_ID_SUCCESS,
  PRODUCT_BY_ID_ERROR,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  SEARCHBAR_SET_KEYWORD,
  SEARCHBAR_CATEGORY_NAME,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  CREATE_ORDER,
  CLEAR_ORDER,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_ERROR,
  ADD_CATEGORY_PRODUCT_REQUEST,
  ADD_CATEGORY_PRODUCT_SUCCESS,
  ADD_CATEGORY_PRODUCT_FAIL,
  REMOVE_CATEGORY_PRODUCT_REQUEST,
  REMOVE_CATEGORY_PRODUCT_SUCCESS,
  REMOVE_CATEGORY_PRODUCT_FAIL,
} from '../constants/productConstants';
import { BEARER } from '../constants/bearerConstants';

const url = 'http://localhost:3001/';

//"Actions creators" dispatch actions to the reducer
//está es la función que utilizamos en el componente

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_BY_ID_REQUEST });

    const { data } = await axios.get(`${url}products/${id}`);
    console.log(data);

    dispatch({
      type: PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_BY_ID_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('http://localhost:3001/products');
    console.log(data);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// search by ID   `http://localhost:3001/products?keyword=${keyword}` => not working
export const listProductDetails = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:3001/products?keyword=${keyword}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createOrder = (idUser, body) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    console.log('ACTION_PRODUCT', idUser, body);
    const { data } = await axios.post(
      `http://localhost:3001/users/${idUser}/cart`,
      body
    );
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setSearchbarKeyword = (keyword) => {
  return { type: SEARCHBAR_SET_KEYWORD, payload: keyword };
};

export const setSearchbarCategoryName = (categoryName) => {
  return { type: SEARCHBAR_CATEGORY_NAME, payload: categoryName };
};

//---------- REVIEWS -----------------------

export const getReviews = ( idProducto ) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST });

    console.log('GET_REVIEW_REQUEST', idProducto );

    const { data } = await axios.get(`${url}reviews/product/${idProducto}/reviews`);

    console.log("GET_REVIEW----", data);
    
    
    dispatch({ type: GET_REVIEW_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: GET_REVIEW_ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

//--------------------------PRODUCT CRUD----------------------------

export const addProduct = (productSend) => async (dispatch) => {
  
    try {
      dispatch({ type: ADD_PRODUCT_REQUEST });

      axios.defaults.headers.common = BEARER()

      const { data } = await axios.post(
        'http://localhost:3001/products',
        productSend
      );
  
      const { dataImage } = await axios.post(`http://localhost:3001/uploads/`, productSend.formData, productSend.config )
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: data[0],
      });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      
    }
  
};

export const editProduct = (id, updates) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_PRODUCT_REQUEST });

    axios.defaults.headers.common = BEARER()

    const { data } = await axios.put(
      `http://localhost:3001/products/${id}`,
      updates
    );
    console.log('EDIT_PRODUCT');
    console.log(data);

    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: data,
    });
    toast.success("Product successfully upgraded")
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error("Can not update the product")
  }
};

export const removeProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_PRODUCT_REQUEST });
    axios.defaults.headers.common = BEARER()
    const { data } = await axios.delete(`http://localhost:3001/products/${id}`);
    console.log('REMOVE_PRODUCT');
    console.log(data);

    dispatch({
      type: REMOVE_PRODUCT_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//------------ADD CATEGORIES A PRODUCT-----------------
export const addCategoriesProduct = (Id,idCategory) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY_PRODUCT_REQUEST });
    const { data } = await axios.post(`http://localhost:3001/products/${Id}/category/${idCategory}`)
    console.log("ADD_CATEGORY_PRODUCT");
    console.log(data);

    dispatch({
      type: ADD_CATEGORY_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//----------------REMOVE CATEGORY TO PRODUCT-------------
export const removeCategoryProduct = (idProduct, idCategory) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CATEGORY_PRODUCT_REQUEST });
    const { data } = await axios.delete(`http://localhost:3001/products/${idProduct}/category/${idCategory}`);
    console.log('REMOVE_PRODUCT');
    console.log(data);

    dispatch({
      type: REMOVE_CATEGORY_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CATEGORY_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};