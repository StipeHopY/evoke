import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Task } from "@/types";

const initialState = [] as Task[];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks(state, action: PayloadAction<Task[]>) {
      state.splice(0, state.length, ...action.payload);
    },
    createTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
  },
});

export const { getTasks, createTask } = tasksSlice.actions;
export default tasksSlice.reducer;
