const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'perpus'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
});

// API untuk membuat transaksi baru
app.post('/transaksi', (req, res) => {
    const { mahasiswa_id, buku_id, tanggal_pinjam, tanggal_kembali } = req.body;
    const status = 'Pinjam';

    const sql = 'INSERT INTO transaksi (mahasiswa_id, buku_id, tanggal_pinjam, tanggal_kembali, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [mahasiswa_id, buku_id, tanggal_pinjam, tanggal_kembali, status], (err, result) => {
        if (err) throw err;
        res.send('Transaksi berhasil ditambahkan');
    });
});

app.get('/transaksi', (req, res) => {
    const sql = 'SELECT * FROM transaksi';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// API untuk mengupdate status transaksi
app.put('/transaksi/:id', (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const sql = 'UPDATE transaksi SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) throw err;
        res.send('Status transaksi berhasil diupdate');
    });
});

// API untuk menghapus transaksi
app.delete('/transaksi/:id', (req, res) => {
    const id = req.params.id;
    
    const sql = 'DELETE FROM transaksi WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Transaksi berhasil dihapus');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
