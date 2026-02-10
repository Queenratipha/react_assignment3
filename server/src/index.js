import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import plantsRouter from './routes/plants.js';
import ordersRouter from './routes/orders.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/users', usersRouter);
app.use('/api/plants', plantsRouter);
app.use('/api/orders', ordersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Garden API listening on port ${port}`);
});