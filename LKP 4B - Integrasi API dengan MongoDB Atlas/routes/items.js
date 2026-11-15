const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Item");

const router = express.Router();

function validNama(value) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 100;
}

function validHarga(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function validKategori(value) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 60;
}

function validPayload(body, partial = false) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const { nama, harga, kategori } = body;
  if (partial && nama === undefined && harga === undefined && kategori === undefined) return null;
  if (!partial && (nama === undefined || harga === undefined)) return null;
  if (nama !== undefined && !validNama(nama)) return null;
  if (harga !== undefined && !validHarga(harga)) return null;
  if (kategori !== undefined && !validKategori(kategori)) return null;

  const data = {};
  if (nama !== undefined) data.nama = nama.trim();
  if (harga !== undefined) data.harga = harga;
  if (kategori !== undefined) data.kategori = kategori.trim();
  return data;
}

router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ sukses: true, jumlah: items.length, data: items });
  } catch {
    res.status(500).json({ sukses: false, pesan: "Gagal mengambil data" });
  }
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ sukses: false, pesan: "ID tidak valid" });
  }
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ sukses: false, pesan: "Item tidak ditemukan" });
    res.json({ sukses: true, data: item });
  } catch {
    res.status(500).json({ sukses: false, pesan: "Gagal mengambil item" });
  }
});

router.post("/", async (req, res) => {
  const data = validPayload(req.body);
  if (!data) return res.status(400).json({ sukses: false, pesan: "Nama dan harga wajib valid" });
  try {
    const item = await Item.create(data);
    res.status(201).json({ sukses: true, data: item });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ sukses: false, pesan: "Data tidak valid" });
    }
    res.status(500).json({ sukses: false, pesan: "Gagal membuat item" });
  }
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ sukses: false, pesan: "ID tidak valid" });
  }
  const data = validPayload(req.body, true);
  if (!data) return res.status(400).json({ sukses: false, pesan: "Data perubahan tidak valid" });
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ sukses: false, pesan: "Item tidak ditemukan" });
    res.json({ sukses: true, data: item });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ sukses: false, pesan: "Data tidak valid" });
    }
    res.status(500).json({ sukses: false, pesan: "Gagal mengubah item" });
  }
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ sukses: false, pesan: "ID tidak valid" });
  }
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ sukses: false, pesan: "Item tidak ditemukan" });
    res.json({ sukses: true, pesan: "Item berhasil dihapus" });
  } catch {
    res.status(500).json({ sukses: false, pesan: "Gagal menghapus item" });
  }
});

module.exports = router;
