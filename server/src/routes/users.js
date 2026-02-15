import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM `User` ORDER BY id DESC');
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

    res.status(201).json({ id: result.insertId, name, email, role: 'user' });
  } catch (err) {
    console.error('POST /api/users/register error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'email, password, role required' });
    }

    const [rows] = await pool.query('SELECT id, name, email, role, password_hash FROM `User` WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: 'role mismatch' });
    }

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error('POST /api/users/login error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

router.patch('/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ error: 'role required' });
    }

    await pool.query('UPDATE `User` SET role = ? WHERE id = ?', [role, id]);
    res.json({ message: 'role updated' });
  } catch (err) {
    console.error('PATCH /api/users/:id/role error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email required' });
    }

    const [existing] = await pool.query('SELECT id FROM `User` WHERE email = ? AND id <> ?', [email, id]);
    if (existing.length) {
      return res.status(409).json({ error: 'email already exists' });
    }

    await pool.query('UPDATE `User` SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    res.json({ message: 'user updated' });
  } catch (err) {
    console.error('PATCH /api/users/:id error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM `User` WHERE id = ?', [id]);
    res.json({ message: 'user deleted' });
  } catch (err) {
    console.error('DELETE /api/users/:id error:', err.message);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
