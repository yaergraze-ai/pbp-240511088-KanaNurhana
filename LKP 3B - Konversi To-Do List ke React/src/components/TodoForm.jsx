import { useState } from "react";

export default function TodoForm({ onTambah }) {
  const [teks, setTeks] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!teks.trim()) return;
    onTambah(teks);
    setTeks("");
  }

  return (
    <form className="form" onSubmit={submit}>
      <label className="form-label" htmlFor="input-todo">Tugas baru</label>
      <div className="form-controls">
        <input id="input-todo" type="text" value={teks} onChange={(event) => setTeks(event.target.value)} maxLength={140} placeholder="Tulis tugas yang ingin dikerjakan..." autoComplete="off" required />
        <button className="button-add" type="submit">Tambah <span aria-hidden="true">+</span></button>
      </div>
    </form>
  );
}
