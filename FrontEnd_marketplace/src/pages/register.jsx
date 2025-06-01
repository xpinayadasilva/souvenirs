import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/LoginRegister.css';

const URL_SERVER = 'http://localhost:5000/users';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    phone: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(URL_SERVER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          rol_id: 'false',
        }),
      });

      if (res.ok) {
        const newUser = await res.json();
        setMessage(`Usuario registrado con éxito: ${newUser.name}`);
        navigate('/login');
      } else {
        setMessage('Error al registrar el usuario');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
        <div className="login-left">    
        </div>
        <div className="login-right">
            <h1 className="">Crear Cuenta</h1>
            <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
                <label htmlFor="name">Nombre</label>
                <div className="input-box">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombres y Apellidos"
                    value={form.name}
                    onChange={handleChange}
                    required                    
                />
                <FaUser className="icon" />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="email" >Correo Electrónico</label>
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
                <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="password">Contraseña</label>
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
                <FaLock className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="country">País</label>
                <div className="input-box">
                <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="País"
                    value={form.country}
                    onChange={handleChange}
                    required
                />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="phone">Teléfono</label>
                <div className="input-box">
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                    required                    
                />
                <FaPhone className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="address">Dirección</label>
                <div className="input-box">
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                    required                    
                />
                <FaMapMarkerAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>
            <button type="submit">Registrar</button>
            </form>
            {message && <p className="text-message">{message}</p>}
            <div className="register-link">
            <p>¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="register-link-text">Iniciar sesión</Link>
            </p>
        </div>       
        </div>
    </div>
  );
};

export default RegisterPage;



 
