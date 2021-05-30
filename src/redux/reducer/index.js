import { combineReducers } from "redux";

import counter from "./counter";
import auth from "./auth";
import user from "./user";
import contact from "./contact";
import roomChat from "./roomChat";

export default combineReducers({
  counter,
  auth,
  user,
  contact,
  roomChat,
});
