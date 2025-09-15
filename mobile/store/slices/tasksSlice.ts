import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  FilterType,
  SortType,
  TasksArrayType,
  TaskStateType,
} from "@/types/task";
import { FILTER_OPTIONS, SORT_OPTIONS } from "@/constants/data";

const initialState: TasksArrayType = {
  tasks: [],
  filter: FILTER_OPTIONS[0],
  sort: SORT_OPTIONS[0],
  loading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks(state, action: PayloadAction<TaskStateType[]>) {
      state.tasks.splice(0, state.tasks.length, ...action.payload);
    },
    createTask(state, action: PayloadAction<TaskStateType>) {
      state.tasks.push(action.payload);
    },
    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearTasks(state) {
      state.tasks = [];
    },
  },
});

export const {
  getTasks,
  createTask,
  clearTasks,
  setFilter,
  setSort,
  setLoading,
} = tasksSlice.actions;
export default tasksSlice.reducer;
