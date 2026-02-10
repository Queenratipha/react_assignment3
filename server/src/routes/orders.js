import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT o.id, o.user_id, o.plant_id, o.quantity, o.status, o.created_at, u.name AS user_name, p.name AS plant_name ' +
    'FROM orders o JOIN `User` u ON o.user_id = u.id JOIN plants p ON o.plant_id = p.id ORDER BY o.id DESC'
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { user_id, plant_id, quantity } = req.body;
  if (!user_id || !plant_id || !quantity) {
    return res.status(400).json({ error: 'user_id, plant_id, quantity required' });
  }

  const [result] = await pool.query(
    'INSERT INTO orders (user_id, plant_id, quantity) VALUES (?, ?, ?)',
    [user_id, plant_id, quantity]
  );

  res.status(201).json({ id: result.insertId, user_id, plant_id, quantity, status: 'pending' });
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'status required' });

  const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  if (!result.affectedRows) return res.status(404).json({ error: 'not found' });
  res.json({ id: Number(id), status });
});

export default router;
