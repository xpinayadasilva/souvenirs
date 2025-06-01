import { Router } from 'express';
const router = Router();
import pool from '../database/conexion.js';

// GET all users
router.get('/', async (req, res) => {
  const result = await pool('SELECT * FROM users ORDER BY id ASC');
  res.json(result.rows);
});

// POST new user
router.post('/', async (req, res) => {
  const {  email, password } = req.body;
  const result = await pool(
    'INSERT INTO users ( email, password) VALUES ($1, $2) RETURNING *',
    [ email, password]
  );
  res.status(201).json(result.rows[0]);
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
