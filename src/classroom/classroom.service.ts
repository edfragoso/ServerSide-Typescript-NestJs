import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClassroomRepository } from './classroom.repository';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {

  constructor(private readonly classroomRepository: ClassroomRepository) {}
  
  async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    const id = randomUUID();
    return await this.classroomRepository.createClassroom(
      createClassroomDto,
      id,
    );
  }

  async findAll(): Promise<Classroom[]> {
    return await this.classroomRepository.findAllClassroom();
  }

  async findOne(id: string): Promise<Classroom> {
    return this.classroomRepository.findClassroomById(id);
  }

  async update(
    id: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<Classroom> {
    this._classroomList.map((classroom, index) => {
      if (classroom.id == id) {
        const updatedClassroom = Object.assign(classroom, updateClassroomDto);
        this._classroomList.splice(index, 1, updatedClassroom);
      }
    });

    return await this.findOne(id);
  }

  async remove(id: string): Promise<string> {
    this._classroomList.map((classroom, index) => {
      if (classroom.id === id) {
        this._classroomList.splice(index, 1);
      }
    });
    return Promise.resolve('Classroom deleted succesfully');
  }
}
