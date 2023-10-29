import { all, takeEvery } from 'redux-saga/effects';
import { todoSaga } from './feature/todo/service/TodoSagas';

function* logging(action: any) {
  console.log(action);
}

export function* rootSaga() {
  yield takeEvery('*', logging);
  yield all([todoSaga()]);
}
