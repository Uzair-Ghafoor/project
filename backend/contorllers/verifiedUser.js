import bcryptjs from 'bcryptjs';
import { User } from '../models/user.js';
export const updateUser = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(401)
        .json({ error: 'You can only update your own account.' });
    }
    console.log(req.user);
    const username = await User.findOne({ username: req.body.username });
    if (username && req.user.username === req.body.username) {
      return res.status(400).json({ error: 'username is already taken.' });
    } else {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
        // $set is used whenenver you want to update only a specific field of the object or the entire object
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
      const { password: pass, ...others } = updatedUser._doc;
      return res.status(200).json(others);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.user._id;
  if (userId.toString().trim() !== req.params.id.trim()) {
    return res.status(404).json('You can delete only your account!');
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json('User has been deleted successfully');
  } catch (error) {
    next(error);
  }
};
