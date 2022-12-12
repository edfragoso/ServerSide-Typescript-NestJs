import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserService } from './user/services/user.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { ClassModule } from './classroom/class/class.module';
import { ClassModule } from './attendance-list/class/class.module';

@Module({
  imports: [DatabaseModule, ClassModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
