import { PrismaService } from "../prisma/prisma.service";
import { AttendanceList } from "./entities/attendance-list.entity";

export class AttendanceListRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async createAttendanceList({
        classroomId,
        day,
        endDate,
        id,
        startDate,
        students,
      }: AttendanceList): Promise<AttendanceList> {
        return await this.prismaService.attendanceList.create({
          data: {
            day: day,
            endDate: endDate,
            id: id,
            startDate: startDate,
            classroomId: classroomId,
          },
          include: {
            students: true,
          },
        });
      }
}