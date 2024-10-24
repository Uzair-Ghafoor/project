import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db.js';
import userRouter from './routes/user.js';
import verifiedUserRouter from './routes/verifyUser.js';
import listingRouter from './routes/listing.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 4000;

app.use('/api/v1/user', userRouter);
app.use('/api/v1/verifiedUser', verifiedUserRouter);
app.use('/api/v1/listing', listingRouter);

app.all('*', (err, req, res, next) => {
  res.send(`cant find ${req.originalUrl} in the server`);
});

const Start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log('connected to db');
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

Start();
