import express from 'express';
import { register, login } from '../Controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/test', async (req: any, res: any) => {
    return res.status(200).json({ message: 'valid Access' })
})

export default router;
