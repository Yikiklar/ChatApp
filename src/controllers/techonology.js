const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Veritabanı bağlantı modülü

// Teknoloji ekleme POST route'u
router.post('/create', async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Teknoloji adı gereklidir.' });
  }

  try {
    // Teknolojiyi veritabanına ekleme
    const [result] = await db.query('INSERT INTO technology (name, description) VALUES (?, ?)', [name, description]);

    res.status(201).json({
      id: result.insertId,
      name,
      description
    });
  } catch (error) {
    console.error('Veritabanı sorgu hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

// Teknoloji arama GET route'u
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Veritabanından teknoloji verilerini alma
    const [rows] = await db.query('SELECT * FROM technology WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Teknoloji bulunamadı.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Veritabanı sorgu hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

// Teknoloji güncelleme PUT route'u
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Teknoloji adı gereklidir.' });
  }

  try {
    // Teknolojiyi veritabanında güncelleme
    const [result] = await db.query('UPDATE technology SET name = ?, description = ? WHERE id = ?', [name, description, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Güncellenecek teknoloji bulunamadı.' });
    }

    res.status(200).json({ id, name, description });
  } catch (error) {
    console.error('Veritabanı sorgu hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

// Teknoloji silme DELETE route'u
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Teknolojiyi veritabanından silme
    const [result] = await db.query('DELETE FROM technology WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Silinecek teknoloji bulunamadı.' });
    }

    res.status(200).json({ message: 'Teknoloji başarıyla silindi.' });
  } catch (error) {
    console.error('Veritabanı sorgu hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

module.exports = router;
