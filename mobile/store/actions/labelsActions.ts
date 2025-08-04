import { Dispatch } from "redux";
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getLabels,
  createDefaultLabels,
  createLabel,
  removeLabel,
  updateLabel,
} from "@/store/slices/labelsSlice";
import { getUser } from "@/store/slices/userSlice";
import { LabelType } from "@/types";
import { MAX_LABELS, defaultLabels } from "@/constants/labels";
import { handleError } from "@/utils/handleError";
import { UserType } from "@/types";

export type ActionType = {
  error: string | null;
};

export const getLabelsAction =
  () =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const userItem = await AsyncStorage.getItem("user");
      if (!userItem) {
        return {
          error: "You are logged out",
        };
      }

      const user: UserType = JSON.parse(userItem);

      if (!user.hasDownloadedDefaultLabels) {
        dispatch(getLabels(defaultLabels));
        
        const updatedUser = {
          ...user,
          hasDownloadedDefaultLabels: true,
          updatedAt: new Date().toISOString(),
        };
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(getUser(user));

        return {
          error: null,
        };
      }

      const existingLabels = await AsyncStorage.getItem("labels");
      if (existingLabels) {
        const labels: LabelType[] = JSON.parse(existingLabels);
        dispatch(getLabels(labels));
      }
      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to get labels");
      return {
        error,
      };
    }
  };

export const createDefaultLabelsAction =
  (labels: LabelType[]) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      await AsyncStorage.setItem("labels", JSON.stringify(labels));
      dispatch(createDefaultLabels(labels));
      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to create labels");
      return {
        error,
      };
    }
  };

export const createLabelAction =
  (value: string) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const existingLabels = await AsyncStorage.getItem("labels");
      const labels: LabelType[] = existingLabels
        ? JSON.parse(existingLabels)
        : [];

      const isDuplicate = labels.some((label) => label.value === value.trim());

      if (isDuplicate) {
        return {
          error: "Label already exists",
        };
      }

      if (labels.length >= MAX_LABELS) {
        console.log("Its more than 20")
        return {
          error: `You can only have up to ${MAX_LABELS} labels.`,
        };
      }

      const newLabel = {
        id: nanoid(),
        value,
      };

      labels.unshift(newLabel);
      await AsyncStorage.setItem("labels", JSON.stringify(labels));
      dispatch(createLabel(newLabel));
      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to create label");
      return {
        error,
      };
    }
  };

export const removeLabelAction =
  (labelId: string) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const existingLabels = await AsyncStorage.getItem("labels");
      if (existingLabels) {
        const labels: LabelType[] = JSON.parse(existingLabels);
        const updatedLabels = labels.filter((label) => label.id !== labelId);
        await AsyncStorage.setItem("labels", JSON.stringify(updatedLabels));
        dispatch(removeLabel(labelId));
      }
      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to remove label");
      return {
        error,
      };
    }
  };

export const updateLabelAction =
  (oldLabel: LabelType, newLabelValue: string) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const existingLabels = await AsyncStorage.getItem("labels");
      if (existingLabels) {
        const labels: LabelType[] = JSON.parse(existingLabels);

        const isDuplicate = labels.some(
          (label) =>
            label.value === newLabelValue && label.value !== oldLabel.value
        );

        if (isDuplicate) {
          return {
            error: "Label already exists",
          };
        }

        const updatedLabels = labels.map((label) =>
          label.value === oldLabel.value
            ? { ...label, value: newLabelValue }
            : label
        );

        await AsyncStorage.setItem("labels", JSON.stringify(updatedLabels));
        dispatch(updateLabel({ oldLabel, newLabelValue }));
        return {
          error: null,
        };
      }

      return {
        error: "No labels found",
      };
    } catch (err) {
      const error = handleError(err, "Failed to update label");
      return {
        error,
      };
    }
  };
