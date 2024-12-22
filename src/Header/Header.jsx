import { v4 as uuid } from "uuid";
import { useState } from "react";

export default function Header({
  data: { sortOption, setSortOption, addTask },
}) {
  const [newTaskName, setNewTaskName] = useState("");

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTaskName.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    const newTask = {
      name: newTaskName.trim(),
      timestamp: new Date(),
      completed: false,
      id: uuid(),
    };

    addTask(newTask);
    setNewTaskName("");
  }

  return (
    <div>
      <h1>TODO LIST</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTaskName || ""}
          onChange={e => setNewTaskName(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="sort-hide-container">
        <label htmlFor="sort">Sort Tasks:</label>
        <select
          id="sort"
          value={sortOption.sortBy}
          onChange={e =>
            setSortOption(prev => ({ ...prev, sortBy: e.target.value }))
          }
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="a-to-z">A to Z</option>
          <option value="z-to-a">Z to A</option>
        </select>

        <label htmlFor="hideorshow">
          Hide completed tasks:
          <input
            type="checkbox"
            id="hideorshow"
            checked={sortOption.hideCompleted}
            onChange={e =>
              setSortOption(prev => ({
                ...prev,
                hideCompleted: e.target.checked,
              }))
            }
          />
        </label>
      </div>
    </div>
  );
}
