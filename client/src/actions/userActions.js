import axios from 'axios';
import { toast } from "react-toastify";

import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_LOGOUT,
  LOGOUT_USER,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_PROMOTE_REQUEST,
  USER_PROMOTE_SUCCESS,
  USER_PROMOTE_FAIL,
  USER_STATE_ADMIN_REQUEST,
  USER_STATE_ADMIN_SUCCESS
} from '../constants/userConstants';
import { BEARER } from '../constants/bearerConstants';

const url = 'http://localhost:3001/';

  
export const promoteUser = (id, role) => async (dispatch) => {
  dispatch({
    type: USER_STATE_ADMIN_REQUEST,
  });

  axios.defaults.headers.common = BEARER()

  console.log("ENTRO AL ACTION")

  console.log(id, role)
  const { data } = await axios.put(`${url}users/${id}/role`, role);

  dispatch({
    type: USER_STATE_ADMIN_SUCCESS,
    role,
    id
  });

};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${url}auths/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  document.location.href = '/login';
  return {
    type: LOGOUT_USER,
  };
};



export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    axios.defaults.headers.common = BEARER()

    const { data } = await axios.get(`${url}users/`);
    console.log(data);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUsers = (body) => async (dispatch) => {
  try {
    dispatch({ type: USER_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${url}auths/register`, body);
    console.log(data);

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });
    toast.success("User created and logged in")

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.warn("Email in use")
    
  }
};
// export const logout = () => (dispatch) => {
//   localStorage.removeItem('userInfo');
//   localStorage.removeItem('cartItems');
//   //localStorage.removeItem('shippingAddress')
//   //localStorage.removeItem('paymentMethod')
//   dispatch({ type: USER_LOGOUT });
//   //dispatch({ type: USER_DETAILS_RESET })
//   //dispatch({ type: ORDER_LIST_MY_RESET })
//   //dispatch({ type: USER_LIST_RESET })
//   document.location.href = '/login';
// };

export const updateUser = (id, user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    console.log('DATOS DESDE ACTION', id, user);

    axios.defaults.headers.common = BEARER()

    const { data } = await axios
      .put(`${url}users/${id}`, user)
      .catch((err) => {
        return console.log(err);

      });

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
    //localStorage.setItem('userInfo', JSON.stringify(data))
    //dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    //dispatch({ type: USER_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};



export const deleteUser = (id) => async (dispatch) => {
  console.log('no deberia ser yo')
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    axios.defaults.headers.common = BEARER()

    const { data } = await axios
      .delete(`${url}users/${id}`)
     


    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: id,
    });
    
  } 



