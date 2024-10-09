import express from 'express';
import { Signin, signup } from '../contorllers/user.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', Signin);

export default router;
