import { Router } from 'express';
const router = Router();
import pool from '../database/conexion.js';
import bcrypt from 'bcryptjs';8

// GET all users
router.get('/', async (req, res) => {
  const result = await pool('SELECT * FROM users ORDER BY id ASC');
  res.json(result.rows);
});

// POST new user
router.post('/', async (req, res) => {
  const { nombre, email, pais, telefono, direccion, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (nombre, email, pais, telefono, direccion, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, email',
      [nombre, email, pais, telefono, direccion, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const result = await pool(
    'UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *',
    [ email, password, id]
  );
  res.json(result.rows[0]);
});

// DELETE user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool('DELETE FROM users WHERE id = $1', [id]);
  res.status(204).send();
});

export default router;
