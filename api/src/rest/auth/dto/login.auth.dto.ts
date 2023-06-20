import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: 'admin',
  })
  @IsString()
  username: string;

  @ApiProperty({
    default: '1234567890',
  })
  @IsString()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  @Expose()
  token: string;

  constructor(partial: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }
}
