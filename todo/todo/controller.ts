import { TodoStorageProvider } from './storage-factory';

type TodoItem = { id: string; note: string; };

class Todo {
  private storageProvider: TodoStorageProvider;

  constructor(storageProvider: TodoStorageProvider) {
    this.storageProvider = storageProvider;
  }

  public async create(todo: TodoItem): Promise<any> {
    console.log("Created todo.");
    this.storageProvider.create(todo);
    return;
  }
}

export default Todo;