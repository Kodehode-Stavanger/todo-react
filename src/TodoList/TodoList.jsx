import TodoItem from "../TodoItem/TodoItem";
export default function TodoList({
  data: { sortedData, editTask, deleteTask },
}) {
  if (sortedData.length === 0) return <h3>😌 You TODO LIST is empty 😌</h3>;
  return (
    <div className="todo-list-container">
      <div className="list-header">
        <span>Completed</span>
        <span>Added</span>
        <span>Task Description</span>
        <span>Actions</span>
      </div>
      <ul>
        {sortedData.map(task => (
          <TodoItem key={task.id} data={{ task, deleteTask, editTask }} />
        ))}
      </ul>
    </div>
  );
}
