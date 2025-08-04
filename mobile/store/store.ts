import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./slices/tasksSlice";
import userReducer from "./slices/userSlice";
import labelsReducer from "./slices/labelsSlice";

const reducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  labels: labelsReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
