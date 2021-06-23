import { Request, Response } from 'express';
import { CreateUserServer } from '../services/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, admin } = req.body;
    const createUserService = new CreateUserServer();
    const user = await createUserService.execute({ name, email, admin });

    return res.json(user);
  }
}

export { CreateUserController };