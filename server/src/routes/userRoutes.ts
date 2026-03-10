import express from 'express';

import { registerUser, getUser } from '../controllers/userController';
import authenticateUser from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', authenticateUser, getUser);

export default router;
