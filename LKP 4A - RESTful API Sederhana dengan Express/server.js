const express = require("express");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "32kb" }));

let items = [
  { id: 1, nama: "Laptop", harga: 8000000 },
  { id: 2, nama: "Mouse", harga: 150000 }
];
let nextId = 3;

function validId(value) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validNama(value) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 100;
}

function validHarga(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

app.get("/api/items", (req, res) => {
  res.json({ sukses: true, data: items });
});

app.get("/api/items/:id", (req, res) => {
  const id = validId(req.params.id);
  if (id === null) return res.status(400).json({ sukses: false, pesan: "ID tidak valid" });

  const item = items.find((value) => value.id === id);
  if (!item) return res.status(404).json({ sukses: false, pesan: "Item tidak ditemukan" });

  res.json({ sukses: true, data: item });
});

app.post("/api/items", (req, res) => {
  const { nama, harga } = req.body ?? {};
  if (!validNama(nama) || !validHarga(harga)) {
    return res.status(400).json({ sukses: false, pesan: "Nama dan harga wajib valid" });
  }

  const item = { id: nextId++, nama: nama.trim(), harga };
  items.push(item);
  res.status(201).json({ sukses: true, data: item });
});

app.put("/api/items/:id", (req, res) => {
  const id = validId(req.params.id);
  if (id === null) return res.status(400).json({ sukses: false, pesan: "ID tidak valid" });

  const item = items.find((value) => value.id === id);
  if (!item) return res.status(404).json({ sukses: false, pesan: "Item tidak ditemukan" });

  const { nama, harga } = req.body ?? {};
  if (nama === undefined && harga === undefined) {
    return res.status(400).json({ sukses: false, pesan: "Isi nama atau harga yang akan diperbarui" });
  }
  if ((nama !== undefined && !validNama(nama)) || (harga !== undefined && !validHarga(harga))) {
    return res.status(400).json({ sukses: false, pesan: "Nama atau harga tidak valid" });
  }

  if (nama !== undefined) item.nama = nama.trim();
  if (harga !== undefined) item.harga = harga;
  res.json({ sukses: true, data: item });
});

app.delete("/api/items/:id", (req, res) => {
  const id = validId(req.params.id);
  if (id === null) return res.status(400).json({ sukses: false, pesan: "ID tidak valid" });

  if (!items.some((item) => item.id === id)) {
    return res.status(404).json({ sukses: false, pesan: "Item tidak ditemukan" });
  }

  items = items.filter((item) => item.id !== id);
  res.json({ sukses: true, pesan: "Item berhasil dihapus" });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}

module.exports = app;
