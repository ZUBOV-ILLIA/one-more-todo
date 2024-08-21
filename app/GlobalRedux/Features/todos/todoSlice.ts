import { TodoType } from "@/app/types/definitions";
import { createSlice } from "@reduxjs/toolkit";

export interface TodoStateInterface {
  todos: TodoType[];
  isPanelVisible: boolean;
}

const initialState: TodoStateInterface = {
  todos: [],
  isPanelVisible: false,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
      state.todos.unshift(action.payload);
    },
    updateTodo(state, action) {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      });
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    togglePanel(state, action) {
      state.isPanelVisible = action.payload;
    }
  }
});

export const { setTodos, addTodo, updateTodo, removeTodo, togglePanel } = todoSlice.actions;
export default todoSlice.reducer;
