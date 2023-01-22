import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HandleException } from "../utils/exceptions/exceptionsHelper";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login-input.dto";
import { Request, UseGuards } from '@nestjs/common/decorators';
import { IsTeacherAuthorization } from "./decorators/is-teacher.decorator";

@Controller('Authorization')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    try {
      return await this.authService.validateUser(data);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsTeacherAuthorization)
  @Get()
  @ApiBearerAuth()
  async getUser(@Request() req) {
   return 'Teacher Access - OK';
  }
}
