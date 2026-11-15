LKP 4A - RESTful API Sederhana dengan Express

Aplikasi RESTful API dengan penyimpanan data sementara di array. Data akan kembali ke contoh awal saat server di-restart.

Persyaratan: Node.js dan npm.

Cara menjalankan:
1. Buka terminal dalam folder LKP 4A.
2. Jalankan npm install.
3. Jalankan npm run dev atau npm start.
4. Gunakan Postman untuk menguji endpoint http://localhost:3000/api/items.

Dokumentasi endpoint:
GET /api/items - Mengambil seluruh item (200).
GET /api/items/1 - Mengambil item berdasarkan ID (200, 400, atau 404).
POST /api/items - Menambahkan item dengan JSON (201 atau 400).
PUT /api/items/1 - Memperbarui nama dan/atau harga (200, 400, atau 404).
DELETE /api/items/2 - Menghapus item (200, 400, atau 404).

Contoh JSON untuk POST:
{"nama":"Keyboard","harga":300000}

Contoh JSON untuk PUT:
{"harga":7500000}

Harga berupa angka yang tidak negatif. Nama berupa teks dengan panjang maksimal 100 karakter.

Luaran yang perlu dilengkapi: lima screenshot pengujian menggunakan Postman untuk GET seluruh data, GET berdasarkan ID, POST, PUT, dan DELETE.

Pesan commit: update
