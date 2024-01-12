export type TodoRepoOptions = {
  tbd: string;
};

export type TodoItem = { id: string; note: string };

export interface ITodosController {
  create(todo: TodoItem): Promise<void>;
}

export interface ITodoRepo {
  create(todo: TodoItem): Promise<void>;
}