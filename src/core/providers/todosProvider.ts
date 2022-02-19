import {TodoBloC} from "../presentation/TodoBloc";
import {TodoStorage} from "../storages/TodoStorage";

export function todosProvider() {
  return new TodoBloC(new TodoStorage())
}
