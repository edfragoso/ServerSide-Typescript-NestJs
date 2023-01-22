import { Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { UserLoginDto } from './dto/user-login-input.dto';
import { compare } from 'bcrypt';
import { Exception } from '../utils/exceptions/exception';
import { Exceptions } from '../utils/exceptions/exceptionsHelper';
import { IUserEntity } from '../user/entityes/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: UserLoginDto) {
    
    const user = await this.userService.findUserByEmail(email);
    const passwordIsValid = await compare(password, user.password);
    
    /* console.log(user) */
    /* console.log(passwordIsValid) */
    
    if (!passwordIsValid) {
      throw new Exception(Exceptions.UnauthorizedException, 'Invalid password');
    }
    delete user.password;

    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        name: user.name,
        role: user.role,
      }),
      user,
    };
  }

  async getUser(email: string): Promise<IUserEntity> {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }
}