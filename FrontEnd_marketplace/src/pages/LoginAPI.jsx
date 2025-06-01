import React, { useState } from 'react';
import '../assets/css/LoginRegister.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL_SERVER = 'http://localhost:5000';

const LoginPageAPI = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(`${URL_SERVER}/login`, {
        email: form.email,
        password: form.password,
      });
      setMessage(`Bienvenido, ${res.data.name}`);
    } catch (error) {
      console.error(error);
      setMessage('Error: ' + (error.response?.data?.message || 'algo salió mal'));
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
            <p>
              ¿No tienes una cuenta?{' '}
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

export default LoginPageAPI;
