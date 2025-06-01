import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/LoginRegister.css';

const URL_SERVER = 'http://localhost:5000/users';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(URL_SERVER);
      const users = await res.json();
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (user) {
        setMessage(`Bienvenido, ${user.name}`);
      } else {
        setMessage('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        {/* <img src="/assets/img/login-image.jpg" alt="Login" className="login-image" /> */}
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Iniciar Sesión</h1>
          <div className="input-group">
            <span>Correo Electrónico <FaUser className="icon" /></span>
            <div className="input-box">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Correo Electrónico"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <span>Contraseña <FaLock className="icon" /></span>
            <div className="input-box">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">Iniciar Sesión</button>
          {message && <p className="text-message">{message}</p>}
          <div className="register-link">
            <p>¿No tienes una cuenta?{' '}
              <Link to="/register" className="register-link-text">
                Crear cuenta
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

