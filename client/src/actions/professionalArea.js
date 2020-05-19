import axios from "axios";
import { PROFESSIONAL_AREAS, PROFESSIONAL_AREAS_ERROR } from "./types";

// Get all professional areas
export const getProfessionalAreas = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/professional-area");

    dispatch({
      type: PROFESSIONAL_AREAS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFESSIONAL_AREAS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
