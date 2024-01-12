import { ITodosController, ITodoRepo, TodoItem } from "./interface";

class TodoController implements ITodosController {
  private todoRepo: ITodoRepo;

  constructor(todoRepo: ITodoRepo) {
    this.todoRepo = todoRepo;
  }

  public async create(todo: TodoItem): Promise<any> {
     return this.todoRepo.create(todo); 
  }
}

export default TodoController;

