import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { AttendanceListModule } from './attendance-list/attendance-list.module';
import { ClassroomModule } from './classroom/classroom.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, ClassroomModule, AttendanceListModule, UserModule],
  
})
export class AppModule {}
