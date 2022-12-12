import { IUserEntity } from "../../user/entityes/user.entity";

export class CreateAttendanceListDto {
    classroomId: string;
    stundents: IUserEntity[];
    startDate: Date;
    endDate: Date;
    todayDate: Date;
}
