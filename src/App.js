import "./App.css";
import TodoContainer from "./TodoContainer";

import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "AWESOME-TODO-APP";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center text-decoration-underline  mb-4">
          AWESOME-TODO-APP
        </h1>
        <div className="week ">
          <TodoContainer todos={todos} setTodos={setTodos} date={24} />
        </div>
      </div>
    </div>
  );
}

export default App;
