import React, { use } from 'react';
import '../assets/css/LoginRegister.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from 'react';
import { motion } from 'framer-motion';

 const LoginPage = () => {  
const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='wrapper'>
        <div className='form-box login'>
        <form action="">
            <h1>Iniciar Sesión</h1>
            <label htmlFor=''>Correo Electrónico <FaUser className='icon' /></label>
            <div className='input-box'>                
                <input type='text' placeholder='Correo Electrónico' required />
                
            </div>
            <label htmlFor=''>Contraseña <FaLock className='icon' /></label>
            <div className='input-box'>
                <input type='password' placeholder='Contraseña' required />
                
            </div>
            <div className='remember-forgot'>
                <label>
                    <input type='checkbox' />Recuerdame</label>
                    <a href="#">Olvido su contraseña?</a>
            </div>
            <button type="submit">Iniciar Sesion</button>
            <div className="register-link">
                <p>No tienes una cuenta?
                    <button type="submit">Crear Cuenta</button>
                </p>
            </div>
        </form>
        </div>  
    </div>
  )
}
export default LoginPage;