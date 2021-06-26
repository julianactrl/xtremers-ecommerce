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
    USER_LOGOUT,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_PROMOTE_REQUEST,
    USER_PROMOTE_SUCCESS,
    USER_PROMOTE_FAIL,
    USER_STATE_ADMIN_REQUEST,
    USER_STATE_ADMIN_SUCCESS

  } from '../constants/userConstants';

  export const userListReducer = (state = { users: [] }, action) => {
    console.log(action)
    console.log(state.users)
    switch (action.type) {
      case USER_LIST_REQUEST:
        return {...state, loading: true };
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload };
        case USER_STATE_ADMIN_REQUEST:
          return {...state, loading: true }
        case USER_STATE_ADMIN_SUCCESS:
          return { loading: false, users: state.users.map(
            user => user.id == action.id ? Object.assign({}, user,{ isAdmin: action.role.status} ) : user ) }
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload };
        case USER_DELETE_REQUEST:
        return {...state, loading: true }
      case USER_DELETE_SUCCESS:
        return { loading: false, users: state.users.filter(user => user.id != action.payload)}
      case USER_DELETE_FAIL:
        return {...state, loading: false, error: action.payload }
        
      
      default:
        return state;
    }
  };

  export const userCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_CREATE_REQUEST:
        return { ...state, loading: true }
      case USER_CREATE_SUCCESS:
        return { loading: false, user: action.payload };
        case USER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true, isAuthenticated: false }
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload, isAuthenticated: true }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload, isAuthenticated: false }
      case USER_LOGOUT:
        return {isAuthenticated: false}
      default:
        return state
    }
  }
  
  export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true }
      case USER_UPDATE_SUCCESS:
        return { loading: false, success: true }
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case USER_UPDATE_RESET:
        return {
          user: {},
        }
      default:
        return state
    }
  }


  export const userPromoteReducer = (state = { user: {} }, action) => {
    switch (action.type) {
     
      default:
        return state
    }
  }