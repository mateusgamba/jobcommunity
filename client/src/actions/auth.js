import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_ERRORS,
  FORGET_SUCCESS,
  FORGET_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD_FAIL
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setToastIn } from "./toastSlim";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  
    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({
  name,
  email,
  password,
  password2
}) => async dispatch => {
  dispatch({
    type: LOGOUT
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password, password2 });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setToastIn("Successfully created a new account.", "success"));
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  dispatch({
    type: LOGOUT
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

// Load User
export const checkUser = () => dispatch => {
  if (!localStorage.token) {
    dispatch({
      type: CLEAR_ERRORS
    });
  }
};

export const forget = data => async dispatch => {
  dispatch({
    type: LOGOUT
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post("/api/auth/forget", body, config);

    dispatch({
      type: FORGET_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FORGET_FAIL,
      payload: err.response.data
    });
  }
};

export const resetPassword = ({
  password,
  password2,
  reset
}) => async dispatch => {
  dispatch({
    type: LOGOUT
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ password, password2, reset });

  try {
    const res = await axios.post("/api/auth/reset-password", body, config);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setToastIn("Successfully created a new password.", "success"));
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: err.response.data
    });
  }
};

export const updatePassword = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.post("/api/auth/update-password", formData, config);

    dispatch({
      type: LOGOUT
    });

    dispatch(
      setToastIn(
        "Successfully change a new password. Please, log in again",
        "success"
      )
    );

    history.push("/change-password");
  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: err.response.data
    });
  }
};

// Logout / Clear Profile
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
