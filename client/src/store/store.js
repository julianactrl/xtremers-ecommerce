import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  searchBarReducer,
  productByIdReducer,
  orderReducer,
  addProductReducer,
  CategoryProductReducer,
} from '../reducers/productReducers.js';
import {
  orderlineByIdReducer,
  addOrderReducer,
  removeOrderReducer,
  OrderLocalReducer,
} from '../reducers/CartReducers';
import categoriesReducer from '../reducers/CategoriesReducers';
import {
  userListReducer,
  userCreateReducer,
  userLoginReducer,
  userUpdateReducer,
  userDeleteReducer,
  userPromoteReducer,
} from '../reducers/userReducers.js';

import { orderCreateReducer } from '../reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  searchBar: searchBarReducer,
  product: productByIdReducer,
  categories: categoriesReducer,
  cart: orderlineByIdReducer,
  orderline: orderReducer,
  users: userListReducer,
  user: userCreateReducer,
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
  order: addOrderReducer,
  newProduct: addProductReducer,
  categoryProduct: CategoryProductReducer,
  cart2: OrderLocalReducer,
  promote: userPromoteReducer,
  orderCreate: orderCreateReducer,
  //orderline2: orderlineByIdReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

//Loading Section

//const initialState = {};

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart2: {
    //order: cartItemsFromStorage,
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [reduxThunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
