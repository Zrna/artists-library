import { combineReducers } from "redux";
import getDataReducer from "./getDataReducer";
import showProfileReducer from "./showProfileReducer";

export default combineReducers({
  getDataReducer,
  showProfileReducer
});
