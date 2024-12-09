import React from 'react';

  function Todo({ todo, removeTodo, toggleComplete }) {
    return (
      <li>
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
        <button onClick={toggleComplete}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={removeTodo}>
          Delete
        </button>
      </li>
    );
  }
  
  

export default Todo;
