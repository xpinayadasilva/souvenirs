// routes/auth.js
import express from 'express';
import db from '../database/conexion.js';
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

  if (result.rows.length === 0) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const user = result.rows[0];
  res.json({ email: user.email,password: user.password });
});

export default router;
