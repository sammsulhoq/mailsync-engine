import { Router } from 'express';
import { login, callback } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.get('/callback', callback);

export default router;
