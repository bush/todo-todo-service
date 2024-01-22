import { MongoClient } from "mongodb";
import { DocumentClient } from "electrodb";

export type TodoRepoOptions = {
  tbd: string;
};

export type TodoItem = { id: string; note: string };

export interface ITodoController {
  create(todo: TodoItem): Promise<void>;
}

export interface ITodoRepo {
  create(todo: TodoItem): Promise<void>;
}
