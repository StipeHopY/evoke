import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { LabelType } from "@/db/database";

const initialState: LabelType[] = [];

// TODO: check if u need to prepare for each function if not delete it in tasksSlice

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    getLabels: (state, action: PayloadAction<LabelType[]>) => {
      state.push(...action.payload);
    },
    createDefaultLabels: (state, action: PayloadAction<LabelType[]>) => {
      state.push(...action.payload);
    },
    createLabel: (state, action: PayloadAction<LabelType>) => {
      state.unshift(action.payload);
    },
    removeLabel: (state, action: PayloadAction<string>) => {
      return state.filter((label) => label.id !== action.payload);
    },
    updateLabel(
      state,
      action: PayloadAction<{ oldLabel: LabelType; newLabelValue: string }>
    ) {
      state.forEach((l) => {
        if (l.id === action.payload.oldLabel.id) {
          l.value = action.payload.newLabelValue;
        }
      });
    },
  },
});

export const {
  getLabels,
  createDefaultLabels,
  createLabel,
  removeLabel,
  updateLabel,
} = labelsSlice.actions;
export default labelsSlice.reducer;
