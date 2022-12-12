import { AttendanceList } from "../../attendance-list/entities/attendance-list.entity";
import { IUserEntity } from "../../user/entityes/user.entity";
import { CreateClassroomDto } from "../dto/create-classroom.dto";

export class Classroom extends CreateClassroomDto {
    id: string;
    students: IUserEntity[];
    teachers: IUserEntity[];
    attendances: AttendanceList[];
}
