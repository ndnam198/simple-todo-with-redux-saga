import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../../firebaseConfig';
import { TodoModel } from '../domain/TodoModel';
import { TodoRepository } from './TodoRepository';

export class FirebaseTodoRepository implements TodoRepository {
  private static _instance: FirebaseTodoRepository;
  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  async getTodos(): Promise<TodoModel[]> {
    const result = await getDocs(collection(FIREBASE_DB, 'todos'));
    return result.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as TodoModel)
    );
  }

  addTodo(todo: Partial<TodoModel>): Promise<any> {
    return addDoc(collection(FIREBASE_DB, 'todos'), {
      isDone: false,
      createAt: new Date().toString(),
      ...todo,
    } as TodoModel);
  }

  updateTodoById(id: string, update: Partial<TodoModel>): Promise<void> {
    const ref = doc(FIREBASE_DB, `todos/${id}`);
    return updateDoc(ref, update);
  }

  deleteTodoById(id: string): Promise<void> {
    const ref = doc(FIREBASE_DB, `todos/${id}`);
    return deleteDoc(ref);
  }

  addListener(onChange: (todos: TodoModel[]) => void) {
    return onSnapshot(collection(FIREBASE_DB, 'todos'), {
      next: (snapshot) => {
        const todos: TodoModel[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({ ...doc.data(), id: doc.id } as TodoModel);
        });
        onChange(todos);
      },
      error: (error) => {
        throw error;
      },
    });
  }
}
