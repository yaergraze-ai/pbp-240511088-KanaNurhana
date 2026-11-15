export default function TodoItem({ todo, onHapus, onToggle }) {
  return (
    <li className={todo.selesai ? "selesai" : ""}>
      <input className="checkbox" type="checkbox" checked={todo.selesai} onChange={() => onToggle(todo.id)} aria-label={`Tandai tugas ${todo.teks} selesai`} />
      <span className="teks">{todo.teks}</span>
      <button className="hapus" type="button" onClick={() => onHapus(todo.id)} aria-label={`Hapus tugas ${todo.teks}`}>Hapus</button>
    </li>
  );
}
