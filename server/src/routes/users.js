import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM `User` ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/users error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, password required' });
    }

    const [existing] = await pool.query('SELECT id FROM `User` WHERE email = ?', [email]);
    if (existing.length) {
      return res.status(409).json({ error: 'email already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO `User` (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, password_hash]
    );

    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    console.error('POST /api/users/register error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }

    const [rows] = await pool.query('SELECT id, name, email, password_hash FROM `User` WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error('POST /api/users/login error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
