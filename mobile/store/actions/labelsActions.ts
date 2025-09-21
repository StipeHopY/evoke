import { Dispatch } from "redux";
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { eq } from "drizzle-orm";

import {
  getLabels,
  createLabel,
  removeLabel,
  updateLabel,
} from "@/store/slices/labelsSlice";
import { setUser } from "@/store/slices/userSlice";
import { LabelCustomType } from "@/types";
import { MAX_LABELS, defaultLabels } from "@/constants/data";
import { handleError } from "@/utils/handleError";
import { ActionType } from "@/types";
import { UserType } from "@/types/user";
import { db, labels } from "@/db/database";

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
        await db.insert(labels).values(defaultLabels);
        dispatch(getLabels(defaultLabels));

        const updatedUser = {
          ...user,
          hasDownloadedDefaultLabels: true,
          updatedAt: new Date().toISOString(),
        };
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(setUser(user));

        return {
          error: null,
        };
      }

      const existingLabels = await db.select().from(labels).limit(MAX_LABELS);
      dispatch(getLabels(existingLabels));
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

export const createLabelAction =
  (labelValue: string) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      if (!labelValue) {
        return {
          error: "Label value is required",
        };
      }

      const storedLabels = await db.select().from(labels);

      if (storedLabels.length >= MAX_LABELS) {
        return {
          error: `You can only have up to ${MAX_LABELS} labels.`,
        };
      }

      const isDuplicate = storedLabels.some(
        (label) => label.value === labelValue
      );

      if (isDuplicate) {
        return {
          error: "Label already exists",
        };
      }

      const newLabel = {
        id: nanoid(),
        value: labelValue,
      };

      await db.insert(labels).values(newLabel);
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
      if (!labelId) {
        return {
          error: "Label ID is required",
        };
      }

      await db.delete(labels).where(eq(labels.id, labelId));
      dispatch(removeLabel(labelId));

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
  (oldLabel: LabelCustomType, newLabelValue: string) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const isDuplicate = await db
        .select()
        .from(labels)
        .where(eq(labels.value, newLabelValue));

      if (isDuplicate) {
        return {
          error: "Label already exists",
        };
      }

      const updatedLabel = await db
        .update(labels)
        .set({ value: newLabelValue })
        .where(eq(labels.id, oldLabel.id));

      if (!updatedLabel) {
        return {
          error: "Failed to update label",
        };
      }

      dispatch(updateLabel({ oldLabel, newLabelValue }));

      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to update label");
      return {
        error,
      };
    }
  };
