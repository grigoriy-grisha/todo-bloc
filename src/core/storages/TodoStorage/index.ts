import {Todo} from "../../entities/Todo";

export class TodoStorage {
  getTodos() {
    return  this.getTodosFromStorage()
  }


  saveTodos(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  getTodosFromStorage() {
    try {
      const todos = localStorage.getItem('todos')
      if (!todos) return []

      return JSON.parse(todos)
    } catch {
      return []
    }
  }
}
