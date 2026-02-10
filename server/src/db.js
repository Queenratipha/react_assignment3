import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const baseConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT || 3306),
  connectTimeout: 5000,
};

const dbName = process.env.DB_NAME || 'garden';

let pool;

try {
  console.log('DB init config:', {
    host: baseConfig.host,
    user: baseConfig.user,
    database: dbName,
  });

  // Ensure database exists before creating the pool
  const connection = await mysql.createConnection(baseConfig);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await connection.end();

  pool = mysql.createPool({
    ...baseConfig,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Ensure tables exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`User\` (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS plants (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL DEFAULT 0,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      plant_id INT NOT NULL,
      quantity INT NOT NULL,
      status VARCHAR(40) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES \`User\`(id) ON DELETE CASCADE,
      CONSTRAINT fk_orders_plant FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE RESTRICT
    )
  `);
} catch (err) {
  console.error('Database init failed:', err);
  throw err;
}

export default pool;
