# 🌸 DompetKu ✨
> Aplikasi pencatat keuangan pribadi yang imut, simpel, dan bikin dompet makin teratur~ 💕

---

## 💖 Apa itu DompetKu?

DompetKu adalah web app pencatat keuangan yang dibuat buat kamu yang punya banyak sumber penghasilan, uang di banyak tempat, dan pengen tetep organized tanpa ribet~

**Fitur-fiturnya ada:**
- 💸 Catat **pemasukan** dari berbagai sumber (gaji, les, desain, dll)
- 💴 Support **mata uang USD + Rupiah** sekaligus (buat yang dapet dolar~)
- 🛍️ Catat **pengeluaran** per kategori (bensin, makan, nongki, buku, dll)
- 📈 Pantau **investasi & celengan** (reksa dana, saham, dll)
- 💰 Catat **uang fisik per lokasi** (dompet, laci, kaleng, dll)
- 📊 **Grafik bulanan** pemasukan vs pengeluaran
- 🔐 **PIN lock** biar privasi tetap terjaga~
- ☁️ Data tersimpan di **Google Sheets kamu sendiri** — aman & bisa diakses dari HP maupun laptop!

---

## 🛠️ Cara Setup (Sekali Aja Kok~)

### Langkah 1 — Siapkan Google Sheets

1. Download file **`SPREADSHEET/Dompetku.xlsx`** dari repo ini
2. Buka [Google Drive](https://drive.google.com) → klik **+ Baru → Upload file**
3. Upload file `Dompetku.xlsx` tadi
4. Setelah terupload, klik kanan filenya → **Buka dengan → Google Spreadsheet**
5. Format kolom udah siap, tinggal lanjut ke langkah berikutnya~ ✨

### Langkah 2 — Pasang Apps Script

1. Di Google Sheets yang tadi dibuka, klik menu **Extensions → Apps Script**
2. Hapus semua kode yang ada di editor (biasanya ada tulisan `function myFunction()`)
3. Buka file **`SPREADSHEET/Appscript.js`** dari repo ini → **copy semua isinya**
4. Paste ke Apps Script editor
5. Klik ikon 💾 **Save**

### Langkah 3 — Deploy Apps Script

1. Klik **Deploy → New deployment**
2. Klik ikon ⚙️ di sebelah "Select type" → pilih **Web app**
3. Isi pengaturan:
   - **Execute as** → `Me`
   - **Who has access** → `Anyone`
4. Klik **Deploy**
5. Akan muncul popup minta izin → klik **Authorize** → pilih akun Google kamu → klik **Allow**
6. Setelah itu muncul **Web app URL** yang panjang → **copy link itu!** 📋

### Langkah 4 — Hubungkan ke DompetKu

1. Buka DompetKu.html 
2. Masukkan PIN 4 digit (pertama kali = set PIN baru~)
3. Akan muncul halaman setup → **paste link Apps Script** tadi ke kolom yang tersedia
4. Klik **Mulai Pakai DompetKu →**
5. Selesai~! 🎉

---

## 🔐 Soal Keamanan & Privasi

- **PIN** tersimpan di browser kamu sendiri, bukan di server manapun
- **Data keuangan** tersimpan di Google Sheets kamu sendiri — developer tidak punya akses sama sekali
- **Link Apps Script** tersimpan di browser kamu, tidak dibagikan ke siapapun
- Setiap pengguna punya Sheets & data mereka sendiri 💕

### Lupa PIN?
1. Klik **"Lupa PIN?"** di bawah numpad
2. Jawab pertanyaan keamanan yang sudah kamu set sebelumnya
3. Masukkan PIN baru

> ⚠️ Pastikan sudah set pertanyaan keamanan dulu dari menu **🔐 Keamanan** setelah masuk ke app ya~

---

## 📱 Cara Pakai di HP & Laptop Sekaligus

Karena data tersimpan di Google Sheets, kamu bisa akses dari perangkat manapun! Tinggal buka link DompetKu di browser HP atau laptop, setup link Apps Script sekali, dan data langsung sinkron~ ✨

---

## 🌸 Dibuat dengan cinta oleh

**Xxcuties** — semoga DompetKu bikin hidup kamu lebih teratur dan dompet makin tebel~ 💖

---

> *"Keuangan yang rapi, hidup yang happy~"* ✨
