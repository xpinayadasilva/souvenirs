import React, { useState, useEffect } from 'react';
import '../assets/css/LoginRegister.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';

const URL_SERVER = 'http://localhost:5000';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isLogin) {
        // Login
        const res = await axios.post(`${URL_SERVER}/auth/login`, {
          email: form.email,
          password: form.password,
        });
        setMessage(`Bienvenido, ${res.data.name}`);
        // Aquí podrías guardar el token en localStorage si usas JWT
      } else {
        // Registro
        const res = await axios.post(`${URL_SERVER}/users`, form);
        setMessage(`Usuario ${res.data.name} creado con éxito`);
        setForm({ name: '', email: '', password: '' });
        setIsLogin(true); // Cambiar a modo login
      }
    } catch (error) {
      console.error(error);
      setMessage('Error: ' + (error.response?.data?.message || 'algo salió mal'));
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-box login'>
        <form onSubmit={handleSubmit}>
          <h1>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>

          {!isLogin && (
            <>
              <label>Nombre <FaUser className='icon' /></label>
              <div className='input-box'>
                <input
                  type='text'
                  name='name'
                  placeholder='Tu nombre'
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <label>Correo Electrónico <FaUser className='icon' /></label>
          <div className='input-box'>
            <input
              type='email'
              name='email'
              placeholder='Correo Electrónico'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Contraseña <FaLock className='icon' /></label>
          <div className='input-box'>
            <input
              type='password'
              name='password'
              placeholder='Contraseña'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</button>

          <div className="register-link">
            <p>{isLogin ? 'No tienes una cuenta?' : 'Ya tienes cuenta?'}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{ marginLeft: '10px', textDecoration: 'underline', color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {isLogin ? 'Registrarse' : 'Iniciar sesión'}
              </button>
            </p>
          </div>

          {message && <p className="text-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
