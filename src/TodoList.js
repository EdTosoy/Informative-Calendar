import React from "react";
import "./TodoList.css";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div>
      {todos.map(({ id, name, complete, date }) => (
        <div
          className={`${
            complete && "completed"
          } p-2 border d-grid place-content-center todo`}
          key={id}
        >
          <div className="d-flex gap-3 justify-content-between  align-items-center ">
            <div
              onClick={() => {
                toggleTodo(id);
              }}
            >
              {complete ? (
                <box-icon name="undo" color="#77C788"></box-icon>
              ) : (
                <box-icon name="check-circle" color="#77C788"></box-icon>
              )}
            </div>
            <p className={`${complete && "text-white"} pt-3 text-capitalize  `}>
              {name}
            </p>
            <div
              onClick={() => {
                deleteTodo(id);
              }}
            >
              <box-icon
                name="trash"
                color={complete ? "#77C788" : "#F2978A"}
              ></box-icon>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
