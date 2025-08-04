import { Dispatch } from "redux";
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserType } from "@/types";
import { createUser, getUser } from "@/store/slices/userSlice";
import { handleError } from "@/utils/handleError";

type ActionType = {
  error: string | null;
};

export const getUserAction =
  () =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const userItem = await AsyncStorage.getItem("user");
      if (userItem) {
        const user = JSON.parse(userItem);
        dispatch(getUser(user));
      }
      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to get user");
      return {
        error,
      };
    }
  };

export const createUserAction =
  (username: string) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const createdUser: UserType = {
        id: nanoid(),
        username,
        hasDownloadedDefaultLabels: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("user", JSON.stringify(createdUser));
      dispatch(createUser(createdUser));
      return { error: null };
    } catch (err) {
      const error = handleError(err, "Failed to create user");
      return {
        error,
      };
    }
  };
