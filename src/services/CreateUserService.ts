import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string,
  email: string,
  password: string,
  admin?: boolean
}
class CreateUserServer {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);
    if(!email) {
      throw new Error('Email incorrect!');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if(userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const passwordHash = await hash(password, 10);

    const user = usersRepository.create({ name, email, password: passwordHash, admin });
    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserServer };