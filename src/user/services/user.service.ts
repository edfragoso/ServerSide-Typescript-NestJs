import { IUserEntity } from '../entityes/user.entity';
import { UserDto } from './dto/userInput.dto';
import { randomUUID } from 'node:crypto';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';
import { Exceptions } from '../../utils/exceptions/exceptionsHelper';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: UserDto): Promise<IUserEntity> {
    const userEntity = { ...user, id: randomUUID(), role: 'user' };
    if (user.password.length <= 7) {
      throw {
        message: 'Password less than 7 characters.',
        exception: Exceptions.InvalidData,
      };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    userEntity.password = hashedPassword;
    const createdUser = await this.userRepository.createUser(userEntity);
    delete createdUser.password;
    return createdUser;
  }

  async updateUser(userData: PartialUserDto): Promise<IUserEntity> {
    const updatedUser = await this.userRepository.updateUser(userData);
    delete updatedUser.password;
    return updatedUser;
  }

  async getAllUsers(): Promise<IUserEntity[]> {
    const allUsers = await this.userRepository.findAllUsers();
    return allUsers;
  }

  async deleteUserById(userId: string): Promise<boolean> {
    try {
      await this.userRepository.deleteUser(userId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async findUserById(userId: string): Promise<IUserEntity> {
    const foundUser = await this.userRepository.findUserById(userId);
    delete foundUser.password;
    return foundUser;
  }

  async findUserByEmail(email: string): Promise<IUserEntity> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }

}
