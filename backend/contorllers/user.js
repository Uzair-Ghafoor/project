import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existedUsername = await User.findOne({ username });
    if (existedUsername) {
      return res.status(400).json({ error: 'Username is already taken.' });
    }
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(400).json({ error: 'Email is already taken.' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be atleast 6 characters.' });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { password: pass, ...rest } = newUser._doc;

    res.status(201).json(rest);
  } catch (error) {
    console.log('signup controller', error);
  }
};
