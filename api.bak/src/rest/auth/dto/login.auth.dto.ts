import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class LoginResponse {
  @Expose()
  token: string;

  constructor(partial: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }
}
