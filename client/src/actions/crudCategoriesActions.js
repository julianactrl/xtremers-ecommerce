import axios from "axios";

import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  GET_ALL_CATEGORIES,
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
} from "../constants/categoriesConstants"
import {BEARER} from '../constants/bearerConstants'

export const getAllCategories = () => (dispatch) => {
  axios.get("http://localhost:3001/categories").then((res) => {
    dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  });
};


export function addCategory(category) {
  return function (dispatch) {

    axios.defaults.headers.common = BEARER()  //pasa el token al back  

    return axios

      .post('http://localhost:3001/categories/', category)
      .then((res) => {
        dispatch({ type: ADD_CATEGORY_SUCCESS, payload: res.data[0] });
      })
      .catch((err) => alert(`${err}`));
  };
}

const _editCategory = (id, updates) => ({
  type: EDIT_CATEGORY,
  id,
  updates,
});

export const editCategory = (id, updates) => {
  console.log(id, updates);
  return (dispatch) => {

    axios.defaults.headers.common = BEARER()

    return axios.put(`http://localhost:3001/categories/${id}`, updates).then(() => {
      dispatch(_editCategory(id, updates));
    });
  };
};

export function removeCategory(id) {
  return function (dispatch) {

    axios.defaults.headers.common = BEARER()
    return axios
      .delete(`http://localhost:3001/categories/${id}`)
      .then((res) => {
        dispatch({ type: REMOVE_CATEGORY, payload: id });
      })
      .catch((err) => alert(`${err}`));
  };
}



