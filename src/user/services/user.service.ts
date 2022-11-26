import { IUserEntity } from '../entityes/user.entity';
import { UserDto } from './dto/userInput.dto';
import { randomUUID } from 'node:crypto';


export class UserService {
  private users: IUserEntity[] = [];

  async createUser(user: UserDto): Promise<IUserEntity> {
    const userEntity = { ...user, id: randomUUID() };
    this.users.push(userEntity);
    return userEntity;
  }
}