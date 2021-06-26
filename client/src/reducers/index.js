import { combineReducers } from 'redux';
import productReducer from './productReducers';
import productListReducers from './productListReducers';
import categoriesReducers from './categoriesReducers'

export default combineReducers({
    products: productReducer,
    productList: productListReducers,
    categories: categoriesReducers
})