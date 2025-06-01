CREATE DATABASE db_souvernirs;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email, password)
VALUES
  ('Ximena', 'ximena@gmail.com', 'ximena'),
  ('Leidy', 'leidy@gmail.com', 'leidy'),
  ('Diego', 'diego@gmail.com', 'diego');