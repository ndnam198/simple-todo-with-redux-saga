import { TodoModel } from '../domain/TodoModel';
import { TodoRepository } from './TodoRepository';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';

export class FirebaseTodoRepository implements TodoRepository {
  todoCollectionRef = collection(FIREBASE_DB, 'todos');

  async getTodos(): Promise<TodoModel[]> {
    const result = await getDocs(this.todoCollectionRef);
    return result.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as TodoModel)
    );
  }

  addTodo(todo: Partial<TodoModel>): Promise<any> {
    return addDoc(this.todoCollectionRef, {
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
    return onSnapshot(this.todoCollectionRef, {
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
