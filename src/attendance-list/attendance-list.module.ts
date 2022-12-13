import { Module } from '@nestjs/common';
import { AttendanceListService } from './attendance-list.service';
import { AttendanceListController } from './attendance-list.controller';
import { ClassroomService } from '../classroom/classroom.service';
import { AttendanceListRepository } from './attendance-list.repository';
import { DatabaseModule } from '../prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AttendanceListController],
  providers: [AttendanceListService, ClassroomService, AttendanceListRepository]
})
export class AttendanceListModule {}
