import React, { useCallback } from 'react';
import TodoListItem from './TodoListItem';
import { List } from 'react-virtualized'; // npm install react-virtualized --legacy-peer-deps

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRander = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        ></TodoListItem>
      );
    },
    [todos, onRemove, onToggle],
  );

  return (
    <List
      className="TodoList"
      list={todos}
      width={512}
      height={513}
      rowHeight={57}
      rowCount={todos.length}
      rowRenderer={rowRander}
      style={{ outline: 'none' }}
    ></List>
  );
};

export default React.memo(TodoList);
