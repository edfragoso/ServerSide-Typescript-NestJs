import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClassroomService } from '../classroom/classroom.service';
import { UserService } from '../user/services/user.service';
import { Exception } from '../utils/exceptions/exception';
import { Exceptions } from '../utils/exceptions/exceptionsHelper';
import { AttendanceListRepository } from './attendance-list.repository';
import { CreateAttendanceListDto } from './dto/create-attendance-list.dto';
import { UpdateAttendanceListDto } from './dto/update-attendance-list.dto';
import { AttendanceList } from './entities/attendance-list.entity';

@Injectable()
export class AttendanceListService {
  constructor(
    private readonly classroomService: ClassroomService,
    private readonly userService: UserService,
    private readonly attendanceLisRepository: AttendanceListRepository,
  ) {}

  async create(
    createAttendanceListDto: CreateAttendanceListDto,
  ): Promise<AttendanceList> {
    await this.classroomService.findOne(createAttendanceListDto.classroomId);

    const today = new Date(Date.now()).toISOString().slice(0, 10);
    const formatedToday =
      today.slice(8, 10) + '/' + today.slice(5, 7) + '/' + today.slice(0, 4);
    const endDateToAttendance = 2 * 60 * 1000;
    const attendanceToday: AttendanceList = {
      ...createAttendanceListDto,
      id: randomUUID(),
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + endDateToAttendance),
      students: [],
      //day: today,
      day: formatedToday,
    };

    return await this.attendanceLisRepository.createAttendanceList(
      attendanceToday,
    );
  }

  async findAll() {
    return await this.attendanceLisRepository.allAttendancesLists();
  }

  async findOne(id: string): Promise<AttendanceList> {
    const findedById = await this.attendanceLisRepository.attendanceListById(id) 
    return findedById;
  }

  async update(updateAttendanceListDto: UpdateAttendanceListDto, ) {
    return await this.attendanceLisRepository.updateAttendanceList(
      updateAttendanceListDto,
    )
  }

  async registerOnAttendanceList(
    attendanceListId: string,
    userId: string,
  ): Promise<AttendanceList> {
    const findedAttendenceList = await this.findOne(attendanceListId);
    const FindedStudent = await this.userService.findUserById(userId)
    const FindedClassroom = await this.classroomService.findOne(findedAttendenceList.classroomId)
    const actualDate = new Date(Date.now());
    
    if (actualDate.getTime() > findedAttendenceList.endDate.getTime()) {
      throw new Exception(Exceptions.InvalidData, 'Ferrou');
    }

    if (!FindedClassroom.students.includes(FindedStudent)) {
      throw new Exception(Exceptions.InvalidData, "This student not fouind in classroom")
      
    }

    return await this.attendanceLisRepository.updateAttendanceList({
      id: attendanceListId,
      studentsId: [userId],
    });
  }

}
