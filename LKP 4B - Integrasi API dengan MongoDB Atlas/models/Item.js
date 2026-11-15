const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  nama: { type: String, required: [true, "Nama wajib diisi"], trim: true, maxlength: 100 },
  harga: { type: Number, required: [true, "Harga wajib diisi"], min: [0, "Harga tidak boleh negatif"] },
  kategori: { type: String, default: "umum", trim: true, maxlength: 60 }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
