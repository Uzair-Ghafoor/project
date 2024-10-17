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

export const Signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'no user found' });
  }
  const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
  const { password: pass, ...rest } = user._doc;

  res
    .cookie('token', token, {
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(rest);
};

export const googleAuth = async (req, res) => {
  try {
    const { username, email, avatar } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...others } = user._doc;
      res.cookie('token', token).status(200).json(others);
    } else {
      const generatedPassword = Math.random().toString(36).split('.').pop();
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        avatar,
      });
      const token = jwt.sign({ id: newUser.__id }, process.env.JWT_SECRET);
      const { password: pass, ...others } = newUser._doc;
      res.cookie('token', token).status(201).json(others);
    }
  } catch (error) {
    console.log(error);
  }
};
