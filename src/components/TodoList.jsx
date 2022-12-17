import React, { useState } from "react";
import { message } from "antd";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import "../App.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  //const sessionTodos = sessionStorage.getItem("Todos");
  //   if (sessionTodos) {
  //     const parsedTodos = JSON.parse(sessionTodos);
  //     message.success("Found Todos");
  //     setTodos(parsedTodos);
  //   }
  const addTodo = (todo) => {
    if (!todo.text || /^\d+$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
    //sessionStorage.setItem("Todos", JSON.stringify(newTodos));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\d+$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completedTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>What`s for today</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completedTodo}
        removeTodo={removeTodo}
        updatedTodo={updateTodo}
      />
    </div>
  );
}
