import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db.js';
import userRouter from './routes/user.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.use('/api/v1/user', userRouter);

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
