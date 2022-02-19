import {BLoC} from "../common/BLoC";
import {Todo} from "../../entities/Todo";
import {TodoStorage} from "../../storages/TodoStorage";

export interface TodoState {
  todos: Todo[]
}

export class TodoBloC extends BLoC<TodoState> {
  private static newTodo(title: string) {
    return {title, checked: false, id: Math.random()}
  }

  constructor(private todoStorage: TodoStorage) {
    super({todos: []});
    this.load()
  }

  load() {
    this.changeState(() => ({todos: this.todoStorage.getTodos()}))
  }

  createTodo(title: string) {
    if (title === "") return;
    this.changeState(({todos}) => ({todos: [...todos, TodoBloC.newTodo(title)]}))
    this.todoStorage.saveTodos(this.state.todos)
  }

  toggleTodo(id: number) {
    const foundTodo = this.findTodoById(id)
    if (!foundTodo) return;

    foundTodo.checked = !foundTodo.checked

    this.changeState(({todos}) => ({todos}))
    this.todoStorage.saveTodos(this.state.todos)
  }

  removeTodo(id: number) {
    const filteredTodo = this.state.todos.filter(todo => todo.id !== id)

    this.changeState(() => ({todos: filteredTodo}))
    this.todoStorage.saveTodos(this.state.todos)
  }

  findTodoById(id: number) {
    return this.state.todos.find(todo => todo.id === id)
  }

}
