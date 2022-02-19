import React, {useMemo} from 'react';
import {Button, Cell, Checkbox, Div, Input, List} from "@vkontakte/vkui";

import {useBloCState} from "./hooks/useBloCState";
import {todosProvider} from "./core/providers/todosProvider";
import useValue from "./hooks/useValue";

import './App.css';


function App() {
  const [value, setValue, clear] = useValue()
  const todoBloc = useMemo(todosProvider, [])
  const todoBlocState = useBloCState(todoBloc)

  return (
    <div className="App">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Div style={{width: "100%"}}>
          <Input placeholder="Добавить задачу" value={value} onChange={setValue}/>
        </Div>
        <Div>
          <Button
            onClick={() => {
              todoBloc.createTodo(value)
              clear()
            }}
          >
            Добавить
          </Button>
        </Div>
      </div>
      <List>
        <Div>
          {todoBlocState.todos.map(todo =>
            <Cell
              mode="removable"
              key={todo.id}
              onRemove={() => todoBloc.removeTodo(todo.id)}
            >
              <Checkbox
                style={{textDecoration: todo.checked ? "line-through" : ''}}
                checked={todo.checked}
                onChange={() => todoBloc.toggleTodo(todo.id)}
              >
                {todo.title}
              </Checkbox>
            </Cell>
          )}
        </Div>
      </List>
    </div>
  );
}

export default App;
