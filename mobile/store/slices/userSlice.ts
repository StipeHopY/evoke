import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserState, UserType } from "@/types/index";

const initialState = null as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(_, action: PayloadAction<UserType>) {
      return action.payload;
    },
    createUser(_, action: PayloadAction<UserType>) {
      return action.payload;
    },
    updateUser(_, action: PayloadAction<UserType>) {
      return action.payload;
    },
    deleteUser(_, action: PayloadAction<UserType>) {
      // TODO: on delete remove also labels and any other user info from his device
      return action.payload;
    },
  },
});

export const { getUser, createUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
