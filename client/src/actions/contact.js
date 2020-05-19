import axios from "axios";
import { setToastIn } from "./toastSlim";
import { SEND_MESSAGE_CONTACT, FAIL_MESSAGE_CONTACT } from "./types";

export const sendMessage = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/contact", formData, config);

    dispatch({
      type: SEND_MESSAGE_CONTACT,
      payload: res.data
    });

    dispatch(setToastIn("Message Sent", "success"));
  } catch (err) {
    dispatch({
      type: FAIL_MESSAGE_CONTACT,
      payload: err.response.data
    });
  }
};
