LKP 4B - Integrasi API dengan MongoDB Atlas

Aplikasi RESTful API menggunakan Express, Mongoose, dan MongoDB Atlas.

Persyaratan: Node.js, npm, akun MongoDB Atlas dan cluster database yang aktif.

Cara menjalankan:
1. Buka terminal pada folder LKP 4B dan jalankan npm install.
2. Buat cluster Free Tier MongoDB Atlas serta database user dengan izin yang sesuai.
3. Atur Network Access hanya untuk alamat IP yang digunakan, apabila memungkinkan.
4. Buat file .env pada folder ini, lalu isi MONGODB_URI dengan connection string Atlas milik sendiri dan PORT=3000.
5. Jangan unggah .env atau password database ke GitHub.
6. Jalankan npm run dev atau npm start setelah memastikan koneksi internet dan Atlas tersedia.

Contoh nama variabel pada .env (isi connection string menggunakan kredensial sendiri):
MONGODB_URI=<connection-string-dari-atlas>
PORT=3000

Dokumentasi endpoint:
GET /api/items - Mengambil seluruh item, diurutkan berdasarkan createdAt terbaru.
GET /api/items/:id - Mengambil item berdasarkan _id MongoDB.
POST /api/items - Menambahkan item baru (201 saat berhasil).
PUT /api/items/:id - Memperbarui item dengan validasi (200 saat berhasil).
DELETE /api/items/:id - Menghapus item (200 saat berhasil).

Contoh JSON untuk POST:
{"nama":"Keyboard","harga":300000,"kategori":"elektronik"}

Contoh JSON untuk PUT:
{"harga":250000}

Mongoose menyimpan createdAt dan updatedAt pada setiap dokumen. Data tetap tersedia setelah server di-restart selama database Atlas masih aktif.

Luaran yang perlu dilengkapi: lima screenshot pengujian CRUD menggunakan Postman, satu screenshot koleksi MongoDB Atlas, dan verifikasi persistensi setelah server restart. Koneksi Atlas belum diuji karena connection string dan izin database berada di akun pemilik proyek.

Pesan commit: update
