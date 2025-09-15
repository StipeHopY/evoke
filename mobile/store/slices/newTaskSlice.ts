import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LabelCustomType } from "@/types";
import { DayValueType, TaskDeadlineType } from "@/types/date";
import { TaskStartDateType } from "@/types/date";
import { TaskStateType } from "@/types/task";

type PayloadType = {
  title: string;
  description: string | null;
};

const initialState: Omit<TaskStateType, "id"> = {
  title: "",
  description: null,
  labelId: null,
  label: null,
  startDateSelected: false,
  startYear: null,
  startMonth: null,
  startDay: null,
  startHour: null,
  startMinute: null,
  deadlineDateSelected: false,
  deadlineYear: null,
  deadlineMonth: null,
  deadlineDay: null,
  deadlineHour: null,
  deadlineMinute: null,
  reminder: null,
  repeat: null,
  highPriority: false,
  points: 0,
  createdAt: null,
  updatedAt: null,
};

const newTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    setTitleAndDesc(state, action: PayloadAction<PayloadType>) {
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    setLabel(state, action: PayloadAction<LabelCustomType>) {
      state.labelId = action.payload.id;
    },
    setStart(state, action: PayloadAction<TaskStartDateType>) {
      state.reminder = action.payload.reminder;
      state.startDateSelected = true;
      state.startYear = action.payload.date.year;
      state.startMonth = action.payload.date.month;
      state.startDay = action.payload.date.day;
      state.startHour = action.payload.time.hour;
      state.startMinute = action.payload.time.minute;
    },
    setDeadline(state, action: PayloadAction<TaskDeadlineType>) {
      state.deadlineDateSelected = true;
      state.deadlineYear = action.payload.date.year;
      state.deadlineMonth = action.payload.date.month;
      state.deadlineDay = action.payload.date.day;
      state.deadlineHour = action.payload.time.hour;
      state.deadlineMinute = action.payload.time.minute;
    },
    setHighPriority(state, action: PayloadAction<boolean>) {
      state.highPriority = action.payload;
    },
    setRepeat(state, action: PayloadAction<DayValueType[] | null>) {
      state.repeat = action.payload;
    },
    resetNewTask() {
      return initialState;
    },
  },
});

export const {
  setTitleAndDesc,
  setLabel,
  setStart,
  setDeadline,
  setHighPriority,
  setRepeat,
  resetNewTask,
} = newTaskSlice.actions;
export default newTaskSlice.reducer;
