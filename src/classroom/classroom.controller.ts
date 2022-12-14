import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandleException } from '../utils/exceptions/exceptionsHelper';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';


@ApiTags("Salas de Aula")
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
   async create(@Body() createClassroomDto: CreateClassroomDto) {
    try {
      return await this.classroomService.create(createClassroomDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.classroomService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.classroomService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    try {
      return await this.classroomService.update(updateClassroomDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.classroomService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }
}
