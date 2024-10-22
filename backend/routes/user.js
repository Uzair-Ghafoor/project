import express from 'express';
import { Signin, signup, googleAuth, logout } from '../contorllers/user.js';
import { verifyUser } from '../utils/verifyUser.js';
import { deleteUser } from '../contorllers/verifiedUser.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', Signin);
router.post('/google', googleAuth);
router.post('/logout', verifyUser, logout);
router.delete('/delete/:id', verifyUser, deleteUser);

export default router;
