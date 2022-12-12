import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClassroomService } from '../classroom/classroom.service';
import { Exception } from '../utils/exceptions/exception';
import { Exceptions } from '../utils/exceptions/exceptionsHelper';
import { CreateAttendanceListDto } from './dto/create-attendance-list.dto';
import { UpdateAttendanceListDto } from './dto/update-attendance-list.dto';
import { AttendanceList } from './entities/attendance-list.entity';

@Injectable()
export class AttendanceListService {
  private _attendanceList: AttendanceList[] = [];
  constructor(private readonly classroomService: ClassroomService) {}

  async create(
    createAttendanceListDto: CreateAttendanceListDto,
  ): Promise<AttendanceList> {
    await this.classroomService.findOne(createAttendanceListDto.classroomId);
    
    const today = new Date(Date.now()).toISOString().slice(0,10);
    const formatedToday = today.slice(8, 10) + 
    "/" + today.slice(5, 7) + 
    "/" + today.slice(0, 4);
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
    
      
      this._attendanceList.push(attendanceToday);
    
      return Promise.resolve(attendanceToday);
  }

  async findAll() {
    return this._attendanceList;
  }

  async findOne(id: string): Promise<AttendanceList> {
    const findAttendanceList = this._attendanceList.find((AttendanceList) => AttendanceList.id === id,
    );
    return findAttendanceList;

  }

  async update(id: string, updateAttendanceListDto: UpdateAttendanceListDto) {
    return ;
  }

  async registerOnAttendanceList(attendanceListId: string, userId: string): Promise<string> {
    const findedAttendenceList = await this.findOne(attendanceListId);
    const actualDate = new Date(Date.now())
    if(actualDate.getTime() > findedAttendenceList.endDate.getTime()){
      throw new Exception(Exceptions.InvalidData, "Ferrou")
    }
    return "Efetuado com sucesso";
  }

  async remove(id: number) {
    return `This action removes a #${id} attendanceList`;
  }
}
