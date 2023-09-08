import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleAddTodo = () => {
    setTodoList((prev) => [...prev, inputValue]);
    setInputValue("");
  };
  const handleRemoveTodo = (indexToRemove) => {
    const updatedTodoList = todoList.filter(
      (_, index) => index !== indexToRemove
    );

    setTodoList(updatedTodoList);
  };
  return (
    <>
      <div className="todolist-main">
        <div>
          <h2>Add Todo List</h2>
          <div>
            <input
              placeholder="Enter Todo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleAddTodo} className="add-button">
              Add
            </button>
          </div>
          <h3>Todo List</h3>
          <div>
            {todoList.length !== 0
              ? todoList.map((ele, index) => (
                  <p key={index}>
                    {ele}{" "}
                    <button onClick={() => handleRemoveTodo(index)}>
                      remove
                    </button>
                  </p>
                ))
              : "No tasks added yet!"}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
