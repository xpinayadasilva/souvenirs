import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
