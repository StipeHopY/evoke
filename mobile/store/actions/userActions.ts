import { Dispatch } from "redux";
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ActionType } from "@/types";
import { UserType } from "@/types/user";
import { setUser, clearUser } from "@/store/slices/userSlice";
import { handleError } from "@/utils/handleError";

export const getUserAction =
  () =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const userItem = await AsyncStorage.getItem("user");
      if (!userItem) {
        return {
          error: "You are logged out",
        };
      }

      const user = JSON.parse(userItem);
      dispatch(setUser(user));
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
      dispatch(setUser(createdUser));
      return { error: null };
    } catch (err) {
      const error = handleError(err, "Failed to create user");
      return {
        error,
      };
    }
  };

export const deleteUserAction =
  () =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      await AsyncStorage.removeItem("user");
      dispatch(clearUser());
      return { error: null };
    } catch (err) {
      return { error: handleError(err, "Failed to delete user") };
    }
  };
