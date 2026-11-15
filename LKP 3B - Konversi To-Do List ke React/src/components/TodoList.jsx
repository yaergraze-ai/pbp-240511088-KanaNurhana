import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onHapus, onToggle }) {
  if (todos.length === 0) {
    return <p className="empty-state">Belum ada tugas. Tambahkan tugas pertama Anda.</p>;
  }

  return (
    <ul className="todo-list" aria-label="Daftar tugas yang tersimpan">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onHapus={onHapus} onToggle={onToggle} />
      ))}
    </ul>
  );
}
