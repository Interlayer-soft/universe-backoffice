import { AuditLogActivity, AuditLogResource } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

class PerformByDto {
  @Expose()
  id: string;

  @Expose()
  username: string;
}

export class RetrieveAuditLogResponse {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  resource: AuditLogResource;

  @Expose()
  activity: AuditLogActivity;

  @Expose()
  @Type(() => PerformByDto)
  performBy: PerformByDto;

  constructor(partial: Partial<RetrieveAuditLogResponse>) {
    Object.assign(this, partial);
  }
}
