CREATE DATABASE db_souvernirs;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

INSERT INTO users ( email, password)
VALUES
  ( 'ximena@gmail.com', 'ximena'),
  ( 'leidy@gmail.com', 'leidy'),
  ( 'diego@gmail.com', 'diego');