import pool from '../database/conexion.js'

const getUsers = async () => {
  const result = await db.query('SELECT * FROM users ORDER BY id ASC');
  res.json(result.rows);
};

const getUser = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1;';
  const { rows} = await pool.query(query, [id]);
  return rows[0];
};

const checkEmailUser = async (email) => {
  const query = 'SELECT email FROM users WHERE email = $1';
  const { rowCount } = await pool.query(query, [email]);
  return rowCount;
};

const newUser = async (name, email, password) => {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
  const { rowCount } = await pool.query(query, [name, email, password]);
  return rowCount;
};

const updateUser = async (id, name, email, password) => {
  const query = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
  const { rowCount } = await pool.query(query, [name, email, password, id]);
  return rowCount;
};

const removeUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1';
  const { rowCount } = await pool.query(query, [id]);
  return rowCount;
};

export const usersModel = {
  getUsers,
  getUser,
  checkEmailUser,
  newUser,
  updateUser,
  removeUser,
};
