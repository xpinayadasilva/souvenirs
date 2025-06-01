import React, { useState } from 'react';
import '../assets/css/LoginRegister.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';

const URL_SERVER = 'http://localhost:5000';

const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(`${URL_SERVER}/users`, form);
      setMessage(`Usuario registrado con éxito`);
      setForm({ email: '', password: '' }); // Limpiar formulario
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setMessage('Error: ' + (error.response?.data?.message || 'algo salió mal'));
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-box login'>
        <form onSubmit={handleSubmit}>
          <h1>Registro de Usuario</h1>

          <label htmlFor="email">Correo Electrónico <FaUser className='icon' /></label>
          <div className='input-box'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Correo Electrónico'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="password">Contraseña <FaLock className='icon' /></label>
          <div className='input-box'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Contraseña'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Crear Cuenta</button>

          {message && <p className="text-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
