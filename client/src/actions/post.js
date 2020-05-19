import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";
import { setToastIn } from "./toastSlim";

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const updateLike = (id, liked) => async dispatch => {
  try {
    const endpoint = liked
      ? `/api/posts/unlike/${id}`
      : `/api/posts/like/${id}`;
    const res = await axios.put(endpoint);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data, liked: !liked }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  if (window.confirm("Are you sure you want to delete this Post?")) {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id
      });

      dispatch(setToastIn("Post Removed", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setToastIn("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setToastIn("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  if (window.confirm("Are you sure you want to delete this Comment?")) {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });

      dispatch(setToastIn("Comment Removed", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
