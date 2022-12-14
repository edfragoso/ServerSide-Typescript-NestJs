import { Module } from '@nestjs/common';
import { AttendanceListService } from './attendance-list.service';
import { AttendanceListController } from './attendance-list.controller';
import { ClassroomService } from '../classroom/classroom.service';
import { AttendanceListRepository } from './attendance-list.repository';
import { DatabaseModule } from '../prisma/database.module';
import { ClassroomRepository } from '../classroom/classroom.repository';
import { UserService } from '../user/services/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AttendanceListController],
  providers: [AttendanceListService,
    ClassroomService, 
    AttendanceListRepository,
    ClassroomRepository,
    UserService,
    UserRepository,
  ]
})
export class AttendanceListModule {}
