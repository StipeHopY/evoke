import { combineReducers, configureStore } from '@reduxjs/toolkit'

import todoReducer from "./todo/todoSlice"
import userReducer from "./user/userSlice"

const reducer = combineReducers({
  user: userReducer,
  todo: todoReducer
})

export const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch