import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';
import { IamGuard } from 'src/pkg/iam/iam.guard';
import { CursorPaginationResponse } from '../auth/dto/cursor-pagination.dto';
import { ListAuditLogQuery } from './dto/list.audit-log.dto';
import { RetrieveAuditLogResponse } from './dto/retrieve.audit-log';

@ApiTags('audit-logs')
@UseGuards(IamGuard)
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly dbSvc: PrismaService) {}

  @Get()
  async list(
    @Query() query: ListAuditLogQuery,
  ): Promise<CursorPaginationResponse<RetrieveAuditLogResponse>> {
    const auditLogs = await this.dbSvc.auditLog.findMany({
      take: query.take + 1,
      ...(query.cursor && {
        cursor: {
          id: query.cursor,
        },
      }),
      where: {
        ...(query.adminId && {
          performById: query.adminId,
        }),
      },
      include: {
        performBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new CursorPaginationResponse<RetrieveAuditLogResponse>(
      auditLogs.map((auditLog) => new RetrieveAuditLogResponse(auditLog)),
      query.take,
    );
  }
}
