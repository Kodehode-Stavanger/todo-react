import { useEffect, useState } from "react";
import "./styles.css";
import Header from "./Header/Header";
import TodoList from "./TodoList/TodoList";

export default function App() {
  const [todoData, setTodoData] = useState(() => {
    const savedData = localStorage.getItem("todoData");
    return savedData
      ? JSON.parse(savedData).map(task => ({
          ...task,
          timestamp: new Date(task.timestamp),
        }))
      : [];
  });

  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem("sortOption");
    return JSON.parse(savedSort) || { sortBy: "newest", hideCompleted: false }; // Default sort option
  });

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
    localStorage.setItem("sortOption", JSON.stringify(sortOption));
  }, [todoData, sortOption]);

  function addTask(newTask) {
    setTodoData(prev => [...prev, newTask]);
  }
  function deleteTask(id) {
    setTodoData(prev => prev.filter(task => task.id !== id));
  }
  function editTask(id, updatedTask) {
    setTodoData(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  }
  const sortedData = [...todoData]
    .filter(task => !task.completed || !sortOption.hideCompleted)
    .sort((a, b) => {
      switch (sortOption.sortBy) {
        case "a-to-z":
          return a.name.localeCompare(b.name);
        case "z-to-a":
          return b.name.localeCompare(a.name);
        case "oldest":
          return a.timestamp - b.timestamp;
        case "newest":
          return b.timestamp - a.timestamp;
        default:
          return 0;
      }
    });

  return (
    <>
      <Header data={{ sortOption, setSortOption, addTask }} />
      <TodoList data={{ sortedData, deleteTask, editTask }} />
    </>
  );
}
