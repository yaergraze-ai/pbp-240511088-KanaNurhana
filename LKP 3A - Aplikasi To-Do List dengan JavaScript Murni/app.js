const STORAGE_KEY = "todos";
const form = document.querySelector("#form-todo");
const input = document.querySelector("#input-todo");
const list = document.querySelector("#list-todo");
const stats = document.querySelector("#stats");

function ambilData() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(data)) return [];
    return data.filter((item) => item && typeof item.id === "string" && typeof item.teks === "string" && typeof item.selesai === "boolean");
  } catch {
    return [];
  }
}

let todos = ambilData();

function simpan() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.replaceChildren();

  if (todos.length === 0) {
    const kosong = document.createElement("li");
    kosong.className = "empty-state";
    kosong.textContent = "Belum ada tugas. Tambahkan tugas pertama Anda.";
    list.append(kosong);
  }

  todos.forEach((todo) => {
    const item = document.createElement("li");
    if (todo.selesai) item.classList.add("selesai");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = todo.selesai;
    checkbox.dataset.id = todo.id;
    checkbox.setAttribute("aria-label", `Tandai tugas ${todo.teks} selesai`);

    const teks = document.createElement("span");
    teks.className = "teks";
    teks.textContent = todo.teks;

    const hapus = document.createElement("button");
    hapus.type = "button";
    hapus.className = "hapus";
    hapus.dataset.id = todo.id;
    hapus.textContent = "Hapus";
    hapus.setAttribute("aria-label", `Hapus tugas ${todo.teks}`);

    item.append(checkbox, teks, hapus);
    list.append(item);
  });

  const belum = todos.filter((todo) => !todo.selesai).length;
  stats.textContent = `${belum} tugas belum selesai`;
}

function tambahTodo(teks) {
  const tugas = teks.trim();
  if (!tugas) return;

  todos.push({
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    teks: tugas,
    selesai: false
  });

  simpan();
  render();
}

function hapusTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  simpan();
  render();
}

function toggleSelesai(id) {
  todos = todos.map((todo) => todo.id === id ? { ...todo, selesai: !todo.selesai } : todo);
  simpan();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  tambahTodo(input.value);
  input.value = "";
  input.focus();
});

list.addEventListener("change", (event) => {
  if (event.target.matches("input[type='checkbox'][data-id]")) {
    toggleSelesai(event.target.dataset.id);
  }
});

list.addEventListener("click", (event) => {
  if (event.target.matches("button.hapus[data-id]")) {
    hapusTodo(event.target.dataset.id);
  }
});

render();
