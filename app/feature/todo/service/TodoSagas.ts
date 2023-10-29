import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { FirebaseTodoRepository } from '../data/FirestoreTodoRepository';
import {
  TodoPayload,
  TodoIdPayload,
  UpdateTodoPayload,
  todoActions,
} from './TodoSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { TodoModel } from '../domain/TodoModel';

function* addTodoWorker(action: PayloadAction<TodoPayload>) {
  try {
    yield call(FirebaseTodoRepository.Instance.addTodo, action.payload.todo);
    yield put(todoActions.addTodoSuccess());
  } catch (err) {
    console.error(err);
    yield put(todoActions.addTodoFailure());
  }
}

function* deleteToDoWorker(action: PayloadAction<TodoIdPayload>) {
  try {
    yield call(
      FirebaseTodoRepository.Instance.deleteTodoById,
      action.payload.id
    );
  } catch (err) {
    console.error(err);
  }
}

function* updateTodoWorkder(action: PayloadAction<UpdateTodoPayload>) {
  try {
    yield call(
      FirebaseTodoRepository.Instance.updateTodoById,
      action.payload.id,
      action.payload.todo
    );
  } catch (err) {
    console.error(err);
  }
}

function* watchAddTodo() {
  yield takeEvery(todoActions.addTodo.type, addTodoWorker);
}

function* watchDeleteTodo() {
  yield takeEvery(todoActions.deleteTodo.type, deleteToDoWorker);
}

function* watchUpdateTodo() {
  yield takeEvery(todoActions.updateTodo.type, updateTodoWorkder);
}

export function watchTodoEvent(onTodosChange: (todos: TodoModel[]) => void) {
  return FirebaseTodoRepository.Instance.addListener(onTodosChange);
}

export function* todoSaga() {
  yield all([watchAddTodo(), watchDeleteTodo(), watchUpdateTodo()]);
}
