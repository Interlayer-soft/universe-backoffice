import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ByAdminDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;
}

export class RetrieveAdminResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => ByAdminDto)
  createdBy: ByAdminDto;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => ByAdminDto)
  updatedBy: ByAdminDto;

  constructor(partial: Partial<RetrieveAdminResponse>) {
    Object.assign(this, partial);
  }
}
