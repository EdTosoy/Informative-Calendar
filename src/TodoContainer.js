import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import { format } from "date-fns";
import "./TodoContainer.css";

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
  const today = format(new Date(), "yyyy-LL-dd-ccc");
  const TODAY_OR_FUTURE =
    today.split("-")[0] + today.split("-")[1] + today.split("-")[2] <=
    date.split("-")[0] + date.split("-")[1] + date.split("-")[2];
  return (
    <div className="text-center mt-5 todo-container">
      <header>
        <h6 className="text-secondary text-uppercase">{date.split("-")[3]}</h6>
        <h3
          className={`${
            today === date && "bg-primary text-white"
          }  p-2 rounded-circle date`}
        >
          {date.split("-")[2]}
        </h3>
        <div className="headline-border"></div>
      </header>

      <TodoList
        todos={TodaysTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      {TODAY_OR_FUTURE && (
        <div className=" border d-grid place-content-center ">
          <button
            className="btn  btn-outline-warning  add-btn"
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
      )}
      <div className="border place-holder"></div>
      <div className="border place-holder"></div>
      <div className="border place-holder"></div>
      <div className="border place-holder"></div>
      <div className="border place-holder"></div>
      <div className="border place-holder"></div>
    </div>
  );
}
