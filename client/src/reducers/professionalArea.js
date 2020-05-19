import { PROFESSIONAL_AREAS, PROFESSIONAL_AREAS_ERROR } from "../actions/types";

const initialState = {
  professionalAreas: null,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFESSIONAL_AREAS:
      return {
        ...state,
        professionalAreas: payload,
        errors: {},
      };

    case PROFESSIONAL_AREAS_ERROR:
      return {
        ...state,
        professionalAreas: null,
        errors: payload,
      };
    default:
      return state;
  }
}
