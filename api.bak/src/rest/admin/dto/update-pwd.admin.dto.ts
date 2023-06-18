import { IsString } from 'class-validator';

export class UpdateAdminPwdDto {
  @IsString()
  password: string;
}
