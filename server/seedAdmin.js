import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'garden',
  port: Number(process.env.DB_PORT || 3306),
};

async function seed() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    // Add role column if it doesn't exist
    const [columns] = await connection.query('SHOW COLUMNS FROM `User` LIKE "role"');
    if (columns.length === 0) {
      await connection.query('ALTER TABLE `User` ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT "user"');
      console.log('Added role column to User table');
    }

    const name = 'Queen';
    const email = 'admin@garden.com';
    const password = 'Ant2007#';
    const role = 'admin';

    const [existing] = await connection.query('SELECT id FROM `User` WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('Admin already exists');
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    await connection.query(
      'INSERT INTO `User` (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, role]
    );
    console.log('Admin user seeded successfully');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await connection.end();
  }
}

seed();
