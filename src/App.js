import React, { useRef, useCallback, useReducer } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const COUNT = 2500;

const createBulkTodos = () => {
  const array = [];
  for (let i = 1; i <= COUNT; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
};

const todoReducer = (todos, action) => {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
};

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos)
  // 두번째 파라미터 undefined
  // 세번째 파라미터에 초기상태를 만들어주는 함수 -> 처음 렌더링할때만 함수 호출
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(COUNT + 1);

  const onToggle = useCallback((id) => {
    console.log('toggle');
    dispatch({
      type: 'TOGGLE',
      id,
    });
  }, []);

  const onInsert = useCallback((text) => {
    const newTodo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({
      type: 'INSERT',
      newTodo,
    });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}></TodoInsert>
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
      ></TodoList>
    </TodoTemplate>
  );
};

export default App;
