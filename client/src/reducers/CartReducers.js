import {
  ORDER_LINE_BY_ID,
  ORDER_LINE_BY_ID_SUCCESS,
  ORDER_LINE_BY_ID_ERROR,
  REMOVE_ORDER_LINE_BY_ID,
  REMOVE_ORDER_LINE_SUCCESS,
  REMOVE_ORDER_LINE_ERROR,
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

//Busca el id del usuario
export const orderlineByIdReducer = (
  state = {
    cart: {},
    order: {},
    shippingAddress: {},
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ORDER_LINE_BY_ID:
      return { ...state, loading: true };
    case ORDER_LINE_BY_ID_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_LINE_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD_ORDER_REQUEST:
      return { ...state, loading: true };
    case ADD_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case ADD_ORDER_ERROR:
      return { loading: false, error: action.payload };
    case REMOVE_ORDER_LINE_BY_ID:
      return { ...state, loading: true };
    case REMOVE_ORDER_LINE_SUCCESS:
      return {
        ...state,
        order: {
          ...state.order,
          orderlines: state.order.orderlines.filter(
            (orderline) => orderline.product.id != action.payload
          ),
        },
      };
    case REMOVE_ORDER_LINE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CHANGE_QUANTITY_PRODUCT_LINE:
      return { ...state, loading: true };
    case CHANGE_QUANTITY_PRODUCT_LINE_SUCCESS:
      return {
        ...state,
        order: {
          ...state.order,
          orderlines: state.order.orderlines.map((orderline) =>
            orderline.id === action.updates.orderlineid
              ? Object.assign({}, orderline, {
                  quantity: action.updates.quantity,
                  subtotal: action.updates.subtotal,
                })
              : orderline
          ),
        },
      };
    case CHANGE_QUANTITY_PRODUCT_LINE_REST:
      return { ...state, loading: true };
    case CHANGE_QUANTITY_PRODUCT_LINE_SUCCESS_REST:
      return {
        ...state,
        order: {
          ...state.order,
          orderlines: state.order.orderlines.map((orderline) =>
            orderline.id === action.payload.orderlineId
              ? Object.assign({}, orderline, {
                  quantity: action.payload.orderlineQuantity - 1,
                })
              : orderline
          ),
        },
      };
    case REMOVE_ORDER_SUCCESS:
      return {
        cart: {},
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export const addOrderReducer = (
  state = {
    order: [],
    error: null,
    loading: false,
    shippingAddress: {},
  },
  action
) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return { ...state, loading: true };
    case ADD_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case ADD_ORDER_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const OrderLocalReducer = (
  state = {
    cartItems: [],
  },
  action
) => {
  console.log(action.payload);
  switch (action.type) {
    case CART_ADD_ITEM:
      var item = action.payload;

      var existItem = state.cartItems.find(
        (x) => x.product.idProduct == item.product.idProduct
      );

      console.log(state.cartItems);
      console.log(existItem);
      if (existItem && existItem !== undefined) {
        console.log('dddddddddddddddddddd');
        return {
          ...state,
          cartItems: state.cartItems.map((car) =>
            car.product.idProduct == action.payload.product.idProduct
              ? Object.assign({}, car, {
                  quantity:
                    parseInt(car.quantity) + parseInt(action.payload.quantity),
                  subtotal: car.subtotal + action.payload.subtotal,
                })
              : car
          ),
        };
      } else {
        console.log('elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      console.log('entre');
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product.idProduct != action.payload
        ),
      };

    case CART_CHANGEQTY_ITEM:
      var item = action.payload;

      var existItem = state.cartItems.find(
        (x) => x.product.idProduct == item.product.idProduct
      );

      console.log(state.cartItems);
      console.log(existItem);
      if (existItem && existItem !== undefined) {
        console.log('dddddddddddddddddddd');
        return {
          ...state,
          cartItems: state.cartItems.map((car) =>
            car.product.idProduct == action.payload.product.idProduct
              ? Object.assign({}, car, {
                  quantity: action.payload.quantity,
                  subtotal: action.payload.subtotal,
                })
              : car
          ),
        };
      } else {
        console.log('elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_TOTAL:
      return {
        ...state,
        cartItems: [],
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};

export const orderListReducer = (
  state = {
    orders: [],
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return { ...state, loading: true };
      case ORDERS_LIST_SUCCESS:
      return {
        loading: false, orders: action.payload,
      };
      case ORDERS_LIST_FAIL:
      return {
        loading: false , error: action.payload
      };

    default:
      return state;
  }
}
//  export const removeOrderReducer = (state = {
//     order: {},
//  }, action) => {
//   console.log('action.payload', action.payload)
//   switch (action.type) {

//  }
// }
