import { Injectable } from '@nestjs/common';
import { Admin, AuditLogActivity, AuditLogResource } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OkResponse } from '../dto/ok.dto';

@Injectable()
export class AuditLogService {
  constructor(private readonly dbSvc: PrismaService) {}

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
