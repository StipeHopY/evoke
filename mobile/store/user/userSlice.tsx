import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

interface User {
  username: string | undefined;
}

const initialState: User = {
  username: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<User>) {
      if (action.payload) {
        state.username = action.payload.username;
        AsyncStorage.setItem("username", action.payload.username || "");
      }
    },
    deleteUser(state) {
      state.username = undefined;
      AsyncStorage.removeItem("username");
    },
  },
});

export const { createUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
