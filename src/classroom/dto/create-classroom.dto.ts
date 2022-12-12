import { IUserEntity } from "../../user/entityes/user.entity";

export class CreateClassDto {
    name: string;
    theme: string;
    subject: string;
    studdents: IUserEntity[];
    teachers: IUserEntity[];
    attendances: boolean[];
}
