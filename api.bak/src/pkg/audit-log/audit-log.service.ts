import { Injectable } from '@nestjs/common';
import { Admin, AuditLogActivity, AuditLogResource } from '@prisma/client';
import { DbService } from '../db/db.service';
import { OkResponse } from '../dto/ok.dto';

@Injectable()
export class AuditLogService {
  constructor(private readonly dbSvc: DbService) {}

  async create(payload: {
    performBy: Admin;
    resource: AuditLogResource;
    activity: AuditLogActivity;
  }): Promise<OkResponse> {
    const { performBy, resource, activity } = payload;
    await this.dbSvc.auditLog.create({
      data: {
        resource: resource,
        activity: activity,
        performBy: {
          connect: {
            id: performBy.id,
          },
        },
      },
    });
    return new OkResponse(true);
  }
}
