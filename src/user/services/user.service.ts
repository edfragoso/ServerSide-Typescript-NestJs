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

  async updateUser(userData: PartialUserDto): Promise<IUserEntity> {
    this.users.map((user, index) => {
      if(user.id === userData.id){
        const upDatedUser = this.users.find((user) => user.id === userData.id);
        return upDatedUser;
      }
    })
  }

}