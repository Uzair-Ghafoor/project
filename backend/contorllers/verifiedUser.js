import bcryptjs from 'bcryptjs';
import { User } from '../models/user.js';
export const updateUser = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(401)
        .json({ error: 'You can only update your own account.' });
    }
    const user = req.body.username;
    const username = await User.findOne({ user });
    if (username) {
      return res.status(400).json({ error: 'username is already taken.' });
    }
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
        },
      },
      { new: true }
    );
    const { password: pass, ...others } = updatedUser._doc;
    return res.status(200).json(others);
  } catch (error) {
    console.log(error);
  }
};
