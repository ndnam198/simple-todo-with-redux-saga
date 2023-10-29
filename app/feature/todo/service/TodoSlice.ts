import { PayloadAction } from './../../../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { TodoModel } from '../domain/TodoModel';

interface TodoSliceState {
  todos: TodoModel[];
  isAddingTodo: boolean;
}

const initialState: TodoSliceState = {
  todos: [],
  isAddingTodo: false,
};

export type TodoPayload = {
  todo: Partial<TodoModel>;
};

export type TodoIdPayload = {
  id: string;
};

export type UpdateTodoPayload = TodoIdPayload & TodoPayload;

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
    setTodos(state, action: PayloadAction<{ todos: TodoModel[] }>) {
      state.todos = action.payload.todos;
    },
    addTodo(state, action: PayloadAction<TodoPayload>) {
      state.isAddingTodo = true;
    },
    addTodoSuccess(state) {
      state.isAddingTodo = false;
    },
    addTodoFailure(state) {
      state.isAddingTodo = false;
    },
    deleteTodo(state, action: PayloadAction<TodoIdPayload>) {},
    updateTodo(state, action: PayloadAction<UpdateTodoPayload>) {},
  },
});

export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

// Selectors:
export const selectLoading = (state) =>
  (state.todoReducer as TodoSliceState).isAddingTodo;
export const selectTodos = (state) =>
  (state.todoReducer as TodoSliceState).todos;
