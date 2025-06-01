import { readFileSync, writeFileSync } from 'fs';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
const usersPath = './src/models/users.json';

const getUsers = () => {
  const data = readFileSync(usersPath, 'utf-8');
  return JSON.parse(data);
};

const saveUsers = (users) => {
  writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

const register = (req, res) => {
  const { nombre, email, password } = req.body;
  const users = getUsers();

  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
  }

  const hashedPassword = hashSync(password, 10);
  const newUser = { id: users.length + 1, nombre, email, password: hashedPassword };
  users.push(newUser);
  saveUsers(users);

  const token = sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ user: newUser, token });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email);
  if (!user || !compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ user, token });
};

const getProfile = (req, res) => {
  const user = req.user;
  res.json(user);
};

const updateProfile = (req, res) => {
  const { nombre, email, phone, direccion } = req.body;
  const users = getUsers();
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  user.nombre = nombre || user.nombre;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.direccion = direccion || user.direccion;

  saveUsers(users);
  res.json(user);
};

const deleteUser = (req, res) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === req.user.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  users.splice(index, 1);
  saveUsers(users);
  res.status(204).send();
};

export default { register, login, getProfile, updateProfile, deleteUser };
