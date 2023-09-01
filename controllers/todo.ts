export class TodoController {
  constructor() {

  }

  create = async(args: any) => {
    console.log('created todo.');
    return { status: 'success', code: 201 }
  } 
}

let todo = new TodoController();
todo.create({});
