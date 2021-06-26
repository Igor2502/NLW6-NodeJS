import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, '2d9cdfda87cc083afa58e78028939cd8') as IPayload;
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}