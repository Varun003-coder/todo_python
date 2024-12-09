import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from './Todo';

function TodoList({ token }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Define fetchTodos outside of useEffect so it can be reused
const fetchTodos = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(response.data);
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

// Use useEffect to call fetchTodos when the component mounts or when token changes
useEffect(() => {
  fetchTodos();
}, [token]);

// Function to add a new todo
const handleAddTodo = async (e) => {
  e.preventDefault();
  try {
    // Make the POST request to add the new todo
    const response = await axios.post(
      'http://127.0.0.1:5000/todos',
      { text: newTodo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    // Fetch the updated list of todos after successfully adding a new one
    fetchTodos();

    // Clear the input field after adding
    setNewTodo('');
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};


  const handleToggleComplete = async (id) => {
    // Find the todo to toggle
    const todoToToggle = todos.find(todo => todo.id === id);
    if (!todoToToggle) return; // If not found, exit early

    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }; // Toggle completion status
      }
      return todo;
    });

    setTodos(updatedTodos);

    // Call the API to update the todo completion status
    try {
      await axios.patch(`http://127.0.0.1:5000/todos/${id}`, 
        { completed: !todoToToggle.completed }, // Send updated completed status
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
      // Optionally revert the state update if the API call fails
      setTodos(todos); // Restore previous state if API call fails
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      if (!token) {
        console.error("No valid token, please log in again.");
        return;
      }
      await axios.delete(`http://127.0.0.1:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  
  

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={() => handleToggleComplete(todo.id)}
            removeTodo={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
