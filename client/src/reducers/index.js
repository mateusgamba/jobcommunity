import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import toast from "./toast";
import contact from "./contact";
import professionalArea from "./professionalArea";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  toast,
  contact,
  professionalArea,
});
