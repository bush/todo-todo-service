import { ITodoController, ITodoRepo, TodoItem } from "./interface";

class TodoController implements ITodoController {
  private todoRepo: ITodoRepo;

  constructor(todoRepo: ITodoRepo) {
    this.todoRepo = todoRepo;
  }

  public async create(todo: TodoItem): Promise<any> {
     return this.todoRepo.create(todo); 
  }

  public async getAll(): Promise<TodoItem[]> {
    return this.todoRepo.getAll();
  }
}

export default TodoController;

