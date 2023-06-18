import { IsString } from 'class-validator';

export class ByIdDto {
  @IsString()
  id: string;
}
