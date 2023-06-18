import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationQuery } from 'src/rest/auth/dto/cursor-pagination.dto';

export class ListAuditLogQuery extends CursorPaginationQuery {
  @IsString()
  @IsOptional()
  adminId?: string;
}
