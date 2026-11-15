import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import TodoStats from "./components/TodoStats.jsx";
import "./App.css";

const STORAGE_KEY = "todos";

function ambilData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return [];
    return saved.filter((todo) => todo && typeof todo.id === "string" && typeof todo.teks === "string" && typeof todo.selesai === "boolean");
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState(ambilData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function tambahTodo(teks) {
    const tugas = teks.trim();
    if (!tugas) return;
    setTodos((current) => [...current, {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      teks: tugas,
      selesai: false
    }]);
  }

  function hapusTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, selesai: !todo.selesai } : todo));
  }

  return (
    <main className="app">
      <header className="app-header">
        <span className="eyebrow">LKP 3B · REACT FUNDAMENTALS</span>
        <div className="heading-row">
          <div>
            <h1>To-Do List<span className="accent">.</span></h1>
            <p className="subtitle">Kelola kegiatan dengan React dan komponen.</p>
          </div>
          <span className="header-icon" aria-hidden="true">✓</span>
        </div>
      </header>
      <section className="content" aria-label="Daftar tugas">
        <TodoForm onTambah={tambahTodo} />
        <div className="list-header">
          <h2>Daftar tugas</h2>
          <TodoStats todos={todos} />
        </div>
        <TodoList todos={todos} onHapus={hapusTodo} onToggle={toggleTodo} />
      </section>
      <footer className="app-footer">Data tersimpan otomatis di browser ini.</footer>
    </main>
  );
}
