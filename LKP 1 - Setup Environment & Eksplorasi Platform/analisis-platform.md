# Lkp 1 — Analisis Platform Web, Desktop, dan Mobile

**Nama:** Kana Nurhana  
**NIM:** 240511088  
**Kelas:** TI24D

## Perbandingan Platform

| Aspek | Web | Desktop | Mobile |
|---|---|---|---|
| Bahasa utama | HTML, CSS, dan JavaScript. Server dapat memakai bahasa lain. | C#, Java, C++, atau JavaScript sesuai teknologi yang digunakan. | Android menggunakan Kotlin atau Java. iOS menggunakan Swift. |
| Arsitektur | Browser menjadi client yang berkomunikasi dengan server melalui HTTP atau API. | Berjalan pada sistem operasi. Arsitekturnya bergantung pada framework. | Mengikuti komponen dan lifecycle OS. Aplikasi juga dapat memakai backend. |
| Cara distribusi | Ditempatkan pada server atau hosting dan diakses melalui URL. | Installer, paket aplikasi, atau toko aplikasi desktop. | Android menggunakan APK untuk instalasi dan AAB untuk publikasi. iOS memakai kanal distribusi Apple. |
| Keunggulan | Bisa diakses melalui browser. Pembaruan di server dapat dilakukan terpusat. | Dapat memanfaatkan fitur lokal dan layanan sistem operasi. | Mudah digunakan saat berpindah tempat dan dapat memakai sensor perangkat. |
| Keterbatasan | Akses fitur perangkat bergantung pada izin browser. Beberapa layanan membutuhkan internet. | Paket dan kompatibilitas perlu disesuaikan dengan sistem operasi. | Variasi perangkat, layar, dan sumber daya perlu dipertimbangkan. |
| Contoh aplikasi | Wikipedia dan Google Docs versi browser. | Visual Studio Code dan Notepad Windows. | Google Maps dan aplikasi kamera pada ponsel. |

## Pembahasan

Pada platform Web, browser meminta halaman dan data dari server [1]. Salah satu teknologi untuk membuat aplikasi Desktop adalah Electron, yang menggunakan *main process* dan *renderer process* [2]. Cara tersebut hanya contoh dari Electron, bukan aturan untuk seluruh aplikasi Desktop. Di Android, pengembang menggunakan komponen seperti *Activity* dan *Service* [3]. Sementara itu, Swift merupakan bahasa yang digunakan dalam pengembangan aplikasi pada ekosistem Apple [4].

## Daftar Pustaka

[1] MDN Web Docs. *How the web works*. Diakses 24 Oktober 2026. https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works

[2] Electron. *Process Model*. Diakses 24 Oktober 2026. https://www.electronjs.org/docs/latest/tutorial/process-model

[3] Android Developers. *Application fundamentals*. Diakses 24 Oktober 2026. https://developer.android.com/guide/components/fundamentals

[4] Apple Developer. *Swift*. Diakses 24 Oktober 2026. https://developer.apple.com/documentation/swift
