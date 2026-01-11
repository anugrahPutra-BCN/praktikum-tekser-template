import { Router } from 'express';
import { showLogin, login, logout, showDashboard } from '../controllers/adminController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/login', showLogin);
router.post('/login', login);
router.get('/logout', logout);
router.get('/dashboard', requireAuth, showDashboard);

export default router;
