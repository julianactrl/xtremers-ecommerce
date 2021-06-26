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

//actions -> dispatch to reducers
//action -> contains the payload (products fetched to the server)
//success sends the data in the payload err sends the err in the payload

//cada reducer tiene su propio state

export const productByIdReducer = (
  state = {
    product: [],
    list: [],
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_BY_ID_SUCCESS:
      return {...state, loading: false, product: action.payload }
    case PRODUCT_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload }
    case GET_REVIEW_REQUEST:
        return { ...state, reviews: {
          loading: false, 
          error: false, 
          list: action.payload 
    }}
    case GET_REVIEW_SUCCESS:
      return { ...state, loading: false, list: action.payload}
    case GET_REVIEW_ERROR:
      return {...state, loading: false, error: action.payload}
    default:
      return state;
  }
};

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchBarReducer = (
  state = { keyword: '', categoryName: '' },
  action
) => {
  switch (action.type) {
    case SEARCHBAR_SET_KEYWORD:
      return { keyword: action.payload };

    case SEARCHBAR_CATEGORY_NAME:
      return { categoryName: action.payload };
    default:
      return state;
  }
};

export const orderReducer = (
  state = {
    order: [],
  },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case CREATE_ORDER_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addProductReducer = (
  state = {
    newProduct: {},
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ADD_PRODUCT_SUCCESS:
    
      return {...state, loading: false, newProduct: action.payload};
    case ADD_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const editProductReducer = (
  state = {
    editProduct: {},
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case EDIT_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case EDIT_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeProductReducer = (
  state = {
    removeProduct: {},
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case REMOVE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case REMOVE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case REMOVE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


//----------------REDUCER ADD CATEGORIES PRODUCT----------------------

export const CategoryProductReducer = (state = {
  categoryProduct: {},
  error: null,
  loading: false
}, action) => {
  switch (action.type) {
    case ADD_CATEGORY_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case ADD_CATEGORY_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case ADD_CATEGORY_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case REMOVE_CATEGORY_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case REMOVE_CATEGORY_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case REMOVE_CATEGORY_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};
