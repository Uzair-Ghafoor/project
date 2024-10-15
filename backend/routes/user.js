import express from 'express';
import { Signin, signup, googleAuth } from '../contorllers/user.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', Signin);
router.post('/google', googleAuth);

export default router;
