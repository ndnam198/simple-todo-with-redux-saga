import { TodoModel } from "../domain/TodoModel";

export interface TodoRepository {
    getTodos(): Promise<TodoModel[]>;
    addTodo(todo: TodoModel): Promise<void>;
    updateTodoById(id: string, update: Partial<TodoModel>): Promise<void>;
    deleteTodoById(id: string): Promise<void>;
    addListener(onChange: (todos: TodoModel[]) => void): any;
}