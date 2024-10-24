import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthrized' });
    }
    const user = await User.findById(decoded.id);
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: 'no user found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error, 'error in the verify user.');
  }
};
