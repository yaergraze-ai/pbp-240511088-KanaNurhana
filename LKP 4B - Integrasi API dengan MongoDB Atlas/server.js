require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const itemsRouter = require("./routes/items");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "32kb" }));
app.use("/api/items", itemsRouter);

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI belum diatur dalam file .env");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log("MongoDB terhubung");
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  })
  .catch(() => {
    console.error("Gagal terhubung ke MongoDB");
    process.exit(1);
  });
