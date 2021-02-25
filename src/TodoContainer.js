import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";

export default function TodoContainer({ todos, setTodos, date }) {
  const [showModal, setShowModal] = useState(false);
  const todoNameRef = useRef();

  const TodaysTodos = todos.filter((todo) => todo.date === date);

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), name: name, complete: false, date },
      ];
    });
    todoNameRef.current.value = null;
    setShowModal(false);
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  }
  const d = new Date();
  return (
    <div className="text-center">
      <header className="">
        <h2>Tue</h2>
        <h3
          className={`${
            d.getDate() === date && "bg-primary text-white"
          }  p-2 rounded-circle  date`}
        >
          {date}
        </h3>
        <div className="headlineBorder"></div>
      </header>

      <TodoList
        todos={TodaysTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      <div className="p-2 border d-grid place-content-center ">
        <button
          className="p-3 btn btn-outline-warning add modarl-content"
          onClick={() => setShowModal((prev) => !prev)}
        >
          Add Item
        </button>
        {showModal && (
          <div
            className="modal-wrapper"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <div
              className="add-modal"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input type="text" ref={todoNameRef} />
              <button
                className="btn btn-outline-warning add"
                onClick={handleAddTodo}
              >
                Add Item
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
