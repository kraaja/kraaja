// server.js

// 1. Import library yang dibutuhkan
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// 2. Inisialisasi aplikasi Express
const app = express();
const PORT = 3000; // Port yang akan kita gunakan

// 3. Konfigurasi dasar
app.use(cors()); // Mengizinkan Cross-Origin Resource Sharing
app.use(express.json()); // Mem-parsing body request JSON
app.use(express.static(__dirname)); // Menyajikan file statis dari direktori saat ini (untuk index.html)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Membuat folder uploads bisa diakses publik

const DB_PATH = path.join(__dirname, 'database.json');

// 4. Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Simpan file di folder 'uploads/'
    },
    filename: function (req, file, cb) {
        // Buat nama file unik untuk menghindari konflik
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// 5. Membuat API Endpoints

// Endpoint untuk mendapatkan semua addon dari database
app.get('/addons', (req, res) => {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint untuk menghandle upload addon
// 'addonFile' harus cocok dengan nama field di FormData frontend
app.post('/upload', upload.single('addonFile'), (req, res) => {
    // Data dari form (selain file) ada di req.body
    const { title, author, category } = req.body;
    
    // Informasi tentang file yang diupload ada di req.file
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const newMod = {
        title: title,
        author: author,
        tags: [category],
        downloads: 0,
        updated: new Date().toLocaleDateString(),
        // Kita simpan path ke file yang diupload
        filePath: `/uploads/${req.file.filename}`,
        image: `https://via.placeholder.com/300x160.png/161B22/FFFFFF?text=${category}`
    };

    // Baca database, tambahkan data baru, lalu tulis kembali
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        db.push(newMod);
        fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing to database');
            }
            res.status(201).json(newMod); // Kirim kembali data mod baru sebagai konfirmasi
        });
    });
});

// 6. Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
