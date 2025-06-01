import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/LoginRegister.css';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    pais: '',
    telefono: '',
    direccion: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/register', form);
      setMessage(`Usuario ${res.data.nombre} registrado con éxito`);
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
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="nombre" className="input-group">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="email" className="input-group">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="pais" className="input-group">País</label>
            <input
              type="text"
              id="pais"
              name="pais"
              value={form.pais}
              onChange={handleChange}
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="input-group">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="direccion" className="input-group">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="password" className="input-group">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="input-box"
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
        {message && <p className="text-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
