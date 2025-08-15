import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

import { Task, LabelType, TaskDateType } from "@/types";

type PayloadType = {
  title: string;
  description: string | null;
};

const initialState: Task = {
  id: nanoid(),
  title: "",
  description: null,
  label: null,
  date: null,
  deadline: null,
  highPriority: false,
};

const newTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    setTitleAndDesc(state, action: PayloadAction<PayloadType>) {
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    setLabel(state, action: PayloadAction<LabelType>) {
      state.label = action.payload;
    },
    setDate(state, action: PayloadAction<TaskDateType>) {
      state.date = action.payload;
    },
    setDeadline(state, action: PayloadAction<TaskDateType>) {
      state.deadline = action.payload;
    },
    setHighPriority(state, action: PayloadAction<boolean>) {
      state.highPriority = action.payload;
    },
    resetNewTask() {
      return initialState;
    },
  },
});

export const {
  setTitleAndDesc,
  setLabel,
  setDate,
  setDeadline,
  setHighPriority,
  resetNewTask,
} = newTaskSlice.actions;
export default newTaskSlice.reducer;
