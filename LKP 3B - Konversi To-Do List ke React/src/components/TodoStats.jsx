export default function TodoStats({ todos }) {
  const belum = todos.filter((todo) => !todo.selesai).length;
  return <p className="stats" role="status" aria-live="polite">{belum} tugas belum selesai</p>;
}
