import express from 'express';
import { signup } from '../contorllers/user.js';
const router = express.Router();

router.post('/signup', signup);

export default router;
