import uuid from "uuid";
import {
  SET_ALERT_TOAST_IN,
  SET_ALERT_TOAST_OUT,
  REMOVE_ALERT_ALERT
} from "./types";

export const setToastIn = (
  message = "",
  display = "",
  timeout = 5000
) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT_TOAST_IN,
    payload: {
      id,
      message,
      display,
      effect: "bounceInDown"
    }
  });

  setTimeout(() => dispatch(setToastOut(id)), timeout);
};

export const setToastOut = id => dispatch => {
  dispatch({
    type: SET_ALERT_TOAST_OUT,
    payload: {
      id,
      effect: "bounceOutUp"
    }
  });

  setTimeout(() => dispatch(removeToast(id)), 1000);
};

export const removeToast = id => dispatch => {
  dispatch({ type: REMOVE_ALERT_ALERT, payload: id });
};
