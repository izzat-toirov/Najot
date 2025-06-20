import { PartialType } from '@nestjs/mapped-types';
import { CreateKurierDto } from './create-kurier.dto';

export class UpdateKurierDto extends PartialType(CreateKurierDto) {}
