import { AttendanceList } from "../../attendance-list/entities/attendance-list.entity";
import { IUserEntity } from "../../user/entityes/user.entity";

export class CreateClassroomDto {
    name: string;
    theme: string;
    subject: string;
    students: IUserEntity[];
    teachers: IUserEntity[];
    attendances: AttendanceList[]; 
}
