import {
  SET_ALERT_TOAST_IN,
  SET_ALERT_TOAST_OUT,
  REMOVE_ALERT_ALERT
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT_TOAST_IN:
      for (let z = 0; z < state.length; z++) {
        if (
          state[z].message === payload.message &&
          state[z].effect === payload.effect
        ) {
          return state;
        }
      }
      return [...state, payload];

    case SET_ALERT_TOAST_OUT:
      const dataUpdate = [...state];
      for (let j = 0; j < dataUpdate.length; j++) {
        if (dataUpdate[j].id === action.payload.id) {
          dataUpdate[j].effect = action.payload.effect;
          break;
        }
      }
      return dataUpdate;

    case REMOVE_ALERT_ALERT:
      const data = state;
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].effect === "bounceOutUp") {
          count++;
        }
      }
      return count === data.length ? [] : data;

    default:
      return state;
  }
}
