import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import questionnaireReducer from "./questionnaireSlice";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    questionnaire: questionnaireReducer,
  }),
});
