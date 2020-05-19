import axios from "axios";
import { setToastIn } from "./toastSlim";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  EXPERIENCE_FAIL,
  EDUCATION_FAIL,
  PROFILE_FAIL,
  PROFILE_EDIT_FAIL
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    const message = edit ? "Profile Updated" : "Profile Created";

    dispatch(setToastIn(message, "success"));

    history.push("/dashboard");
  } catch (err) {
    if (edit) {
      dispatch({
        type: PROFILE_EDIT_FAIL,
        payload: err.response.data
      });
    } else {
      dispatch({
        type: PROFILE_FAIL,
        payload: err.response.data
      });
    }
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setToastIn("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: EXPERIENCE_FAIL,
      payload: err.response.data
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setToastIn("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: EDUCATION_FAIL,
      payload: err.response.data
    });
  }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
  if (window.confirm("Are you sure you want to delete this Experience?")) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setToastIn("Experience Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  if (window.confirm("Are you sure you want to delete this Education?")) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setToastIn("Education Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(
        setToastIn("Your account has been permanantly deleted", "success")
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
