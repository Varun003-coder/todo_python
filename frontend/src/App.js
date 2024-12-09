import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TodoList token={token} />
        </>
      ) : (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      )}
    </div>
  );
}

export default App;
