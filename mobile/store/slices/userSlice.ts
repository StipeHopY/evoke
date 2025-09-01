import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, UserState } from "@/types/user";

const initialState = null as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<UserType>) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
