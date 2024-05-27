import { Router } from 'express';
import { syncEmailData } from '../controllers/syncController';

const router = Router();

router.post('/emails', syncEmailData);

export default router;
