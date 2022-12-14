import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandleException } from '../utils/exceptions/exceptionsHelper';
import { AttendanceListService } from './attendance-list.service';
import { CreateAttendanceListDto } from './dto/create-attendance-list.dto';
import { RegisterOnAttendanceListDto } from './dto/register-on-attendance-list.dto';
import { UpdateAttendanceListDto } from './dto/update-attendance-list.dto';


@ApiTags("Lista de Presenças")
@Controller('attendance-list')
export class AttendanceListController {
  constructor(private readonly attendanceListService: AttendanceListService) {}

  @Post()
  create(@Body() createAttendanceListDto: CreateAttendanceListDto) {
    return this.attendanceListService.create(createAttendanceListDto);
  }

  @Post("registerInAttendanceList")
  async registerInAttendanceList(
    @Body() { attendanceListId, userId }: RegisterOnAttendanceListDto,) {
      try {
        return await this.attendanceListService.registerOnAttendanceList(attendanceListId, userId);
      } catch (error) {
        HandleException(error)
      }
    }

  @Get()
  findAll() {
    return this.attendanceListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceListService.findOne(id);
  }

  @Patch(':id')
  update(@Body()updateAttendanceListDto: UpdateAttendanceListDto) {
    return this.attendanceListService.update(updateAttendanceListDto);
  }

}
