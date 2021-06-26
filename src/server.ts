import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';

import './database';

const app = express();

app.use(cors())
app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return res.status(400).json({ error: err.message});
  }

  return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Server is running!'));