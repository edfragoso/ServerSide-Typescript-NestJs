import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-classroom.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
