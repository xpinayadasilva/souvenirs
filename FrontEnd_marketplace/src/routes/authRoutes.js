import { Router } from 'express';
import { register, login, getProfile, updateProfile, deleteUser } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteUser);

export default router;
