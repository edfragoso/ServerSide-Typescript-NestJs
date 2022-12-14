import { Classroom } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

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

  async createClassroom({
    id,
    name,
    subject,
    theme,
  }: Classroom): Promise<Classroom> {
    return await this.prismaService.classroom.create({
      data: {
        id: id,
        name: name,
        subject: subject,
        theme: theme,
      },
      include: {
        attendances: {
          include: {
            students: true,
          },
        },
        students: true,
        teachers: true,
      },
    });
  }

  async updateClassroom(updateData: UpdateClassroomDto): Promise<Classroom> {
    return await this.prismaService.classroom.update({
      where: { id: updateData.id },
      data: {
        ...updateData,
        students: {
          connect: updateData.studentsIds?.map((id) => ({ id: id })),
        },
        teachers: {
          connect: updateData.teachersIds?.map((id) => ({ id: id })),
        },
      },
      include: this.dataToReturn,
    });
  }

  async deleteClassroom(id: string): Promise<Classroom> {
    return await this.prismaService.classroom.delete({
      where: { id: id },
    });
  }

}
