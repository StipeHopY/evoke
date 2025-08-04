import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  text: string;
}

const initialState = [] as Task[];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text,
        },
      }),
    },
    deleteTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.filter((task: Task) => task.id !== action.payload.id);
      },
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text,
        },
      }),
    },
  },
});

export default tasksSlice.reducer;
