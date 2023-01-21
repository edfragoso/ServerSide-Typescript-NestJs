import { Injectable } from '@nestjs/common';
import { Classroom } from './entities/classroom.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Exception } from '../utils/exceptions/exception';
import { Exceptions } from '../utils/exceptions/exceptionsHelper';

@Injectable()
export class ClassroomRepository {
  private dataToReturn = {
    students: true,
    teachers: true,
    attendances: {
      include: {
        students: true,
      },
    },
  };
  constructor(private readonly prismaService: PrismaService) {}

  async createClassrooms(
    { name, subject, theme }: CreateClassroomDto,
    id: string,
  ): Promise<Classroom> {
    try {
      return await this.prismaService.classroom.create({
        data: {
          id: id,
          name: name,
          subject: subject,
          theme: theme,
        },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException, err.message);
    }
  }

  async updateClassroom(updateData: UpdateClassroomDto): Promise<Classroom> {
    try {
      const studentsIds = updateData.studentsIds;
      const teachersIds = updateData.teachersIds;

      delete updateData.studentsIds;
      delete updateData.teachersIds;

      return await this.prismaService.classroom.update({
        where: { id: updateData.id },
        data: {
          students: {
            connect: studentsIds?.map((id) => ({ id: id })),
          },
          teachers: {
            connect: teachersIds?.map((id) => ({ id: id })),
          },
        },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException, err.message);
    }
  }

  async deleteClassrooms(id: string): Promise<Classroom> {
    try {
      return await this.prismaService.classroom.delete({
        where: { id: id },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException, err.message);
    }
  }

  async findClassroomById(id: string): Promise<Classroom> {
    try {
      return await this.prismaService.classroom.findUnique({
        where: { id: id },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException, err.message);
    }
  }

  async findAllClassrooms(): Promise<Classroom[]> {
    try {
      return await this.prismaService.classroom.findMany({
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException, err.message);
    }
  }
}
