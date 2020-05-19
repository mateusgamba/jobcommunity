import { SEND_MESSAGE_CONTACT, FAIL_MESSAGE_CONTACT } from "../actions/types";

const initialState = {
  message: null,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_MESSAGE_CONTACT:
      return {
        ...state,
        message: payload,
        errors: {}
      };

    case FAIL_MESSAGE_CONTACT:
      return {
        ...state,
        message: null,
        errors: payload
      };
    default:
      return state;
  }
}
