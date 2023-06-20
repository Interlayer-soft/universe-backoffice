import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';
import { ApiOkResponsePaginated } from 'src/pkg/decorator/api-ok-response-paginated.decorator';
import { IamGuard } from 'src/pkg/iam/iam.guard';
import { CursorPaginationResponse } from '../../pkg/dto/cursor-pagination.dto';
import { ListAuditLogQuery } from './dto/list.audit-log.dto';
import { RetrieveAuditLogResponse } from './dto/retrieve.audit-log';
@ApiBearerAuth()
@UseGuards(IamGuard)
@ApiTags('audit-logs')
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly dbSvc: PrismaService) {}

  @ApiOkResponsePaginated(RetrieveAuditLogResponse)
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
