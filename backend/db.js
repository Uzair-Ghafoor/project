import mongoose from 'mongoose';

export const connectDb = (url) => {
  return mongoose.connect(url);
};
