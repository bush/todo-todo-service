import { TodoStorageProvider } from "./storage-factory";
import { Router } from 'express';
import util from 'util';
type TodoItem = { id: string; note: string };

class TodosController {
  private storageProvider: TodoStorageProvider;
  public router = Router();

  constructor(storageProvider: TodoStorageProvider) {
    this.storageProvider = storageProvider;
  }

  public async create(todo: TodoItem): Promise<any> {
     return this.storageProvider.create(todo); 
  }
}

export default TodosController;
