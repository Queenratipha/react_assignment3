import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM plants ORDER BY id DESC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, price, stock, description } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: 'name, price, stock required' });
  }

  const [result] = await pool.query(
    'INSERT INTO plants (name, price, stock, description) VALUES (?, ?, ?, ?)',
    [name, price, stock, description || null]
  );

  res.status(201).json({ id: result.insertId, name, price, stock, description: description || null });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description } = req.body;

  const [result] = await pool.query(
    'UPDATE plants SET name = ?, price = ?, stock = ?, description = ? WHERE id = ?',
    [name, price, stock, description || null, id]
  );

  if (!result.affectedRows) return res.status(404).json({ error: 'not found' });
  res.json({ id: Number(id), name, price, stock, description: description || null });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query('DELETE FROM plants WHERE id = ?', [id]);
  if (!result.affectedRows) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

export default router;