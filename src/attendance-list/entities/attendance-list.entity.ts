import { IUserEntity } from "../../user/entityes/user.entity";
import { CreateAttendanceListDto } from "../dto/create-attendance-list.dto";

export class AttendanceList extends CreateAttendanceListDto {
    id: string;
    startDate: Date;
    endDate: Date;
    students: IUserEntity[] = [];
    day: string;
}
