import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  CLEAR_ERRORS,
  FORGET_SUCCESS,
  FORGET_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: null,
  successMessage: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        errors: null
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        errors: null
      };
    case FORGET_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        errors: null,
        successMessage: payload.message
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case FORGET_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: payload,
        successMessage: null
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload
      };

    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: null
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
        successMessage: null
      };

    default:
      return state;
  }
}
