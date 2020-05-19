import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  EXPERIENCE_FAIL,
  EDUCATION_FAIL,
  PROFILE_FAIL,
  PROFILE_EDIT_FAIL
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {},
  errorsEdit: {},
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        errors: {},
        errorsEdit: {},
        error: {}
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case PROFILE_FAIL:
    case EDUCATION_FAIL:
    case EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case PROFILE_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        errorsEdit: payload
      };
    default:
      return state;
  }
}
