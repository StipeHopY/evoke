import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
}

const initialState = [] as Todo[];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => {
        const id = nanoid();
        return { payload: { id, text } };
      },
    },
    deleteTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.filter((todo: Todo) => (
            todo.id !== action.payload.id
        ));
      },
      prepare: (text: string) => {
        const id = nanoid();
        return { payload: { id, text } };
      },
    },
  },
});

export default todoSlice.reducer;
