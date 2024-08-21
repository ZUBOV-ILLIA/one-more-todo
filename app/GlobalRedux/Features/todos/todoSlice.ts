import { createSlice } from "@reduxjs/toolkit";
import { todo } from "node:test";

export interface TodoStateInterface {
  todos: string[];
  isPanelVisible: boolean;
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    isPanelVisible: false,
  },
  reducers: {
    addTodo(state, action) {

    },
    updateTodo(state, action) {

    },
    removeTodo(state, action) {

    },
    togglePanel(state, action) {
      state.isPanelVisible = action.payload;
    }
  }
});

export const { addTodo, updateTodo, removeTodo, togglePanel } = todoSlice.actions;
export default todoSlice.reducer;
