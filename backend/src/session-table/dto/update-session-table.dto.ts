import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionTableDto } from './create-session-table.dto';

export class UpdateSessionTableDto extends PartialType(CreateSessionTableDto) {}
