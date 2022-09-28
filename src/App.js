import "./App.css";
import TodoContainer from "./TodoContainer";

import { useState, useEffect } from "react";
import { addDays, startOfWeek, format } from "date-fns";

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
  const [datePickerValue, setDatePickerValue] = useState(null);
  let d;
  if (datePickerValue == null) {
    d = new Date();
  } else {
    d = new Date(datePickerValue);
  }

  const weekStart = startOfWeek(d);
  const week = [...Array(7)].map((_, i) =>
    format(addDays(weekStart, i), "yyyy-LL-dd-ccc")
  );

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center text-decoration-underline  mb-4">
          Informative Calendar
        </h1>
        <div className="date-container">
          <h3 className="text-secondary">{format(d, "LLLL")}</h3>
          <input
            type="date"
            id="date"
            name="date"
            value={datePickerValue}
            onChange={(e) => setDatePickerValue(e.target.value)}
          />
        </div>
        <div className="week">
          {week.map((date, index) => (
            <TodoContainer
              todos={todos}
              setTodos={setTodos}
              date={date}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
