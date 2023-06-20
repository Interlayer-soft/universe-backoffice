import { ApiProperty } from '@nestjs/swagger';
import { AuditLogActivity, AuditLogResource } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

class PerformByDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;
}

export class RetrieveAuditLogResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  resource: AuditLogResource;

  @ApiProperty()
  @Expose()
  activity: AuditLogActivity;

  @ApiProperty()
  @Expose()
  @Type(() => PerformByDto)
  performBy: PerformByDto;

  constructor(partial: Partial<RetrieveAuditLogResponse>) {
    Object.assign(this, partial);
  }
}
