import { useState, useRef } from "react";
export default function TodoItem({ data: { task, deleteTask, editTask } }) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [taskName, setTaskName] = useState(task.name);
  const inputRef = useRef(null);

  function handleEdit() {
    if (!isReadOnly) {
      editTask(task.id, { ...task, name: taskName });
    } else {
      inputRef.current?.focus();
    }
    setIsReadOnly(prev => !prev);
  }
  function changeCompleted() {
    editTask(task.id, { ...task, completed: !task.completed });
  }
  const formattedTime = task.timestamp.toLocaleString("en-GB", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <li className={task.completed ? "completed" : ""}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={changeCompleted}
      />
      <p>{formattedTime}</p>
      <input
        type="text"
        ref={inputRef}
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        readOnly={isReadOnly}
      />
      <button className={isReadOnly ? "edit" : "save"} onClick={handleEdit}>
        {isReadOnly ? "Edit" : "Save"}
      </button>
      <button className="delete" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}
