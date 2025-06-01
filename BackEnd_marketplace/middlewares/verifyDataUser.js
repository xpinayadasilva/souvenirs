import { handleError } from "../utilities/handleError.js";

export const verifyDataUser = (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw { code: 400, message: 'Faltan datos de nombre, email o password' };
      }
  
      const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
      if (!isEmailValid) {
        throw { code: 400, message: 'El correo electronico no es valido.' };
      }
      
      next();
    } catch (error) {
      const { status, message } = handleError(error.code, error.message);
      return res.status(status).json({ ok: false, message });
    }
  };