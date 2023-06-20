import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationQuery } from 'src/pkg/dto/cursor-pagination.dto';

export class ListAuditLogQuery extends CursorPaginationQuery {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  adminId?: string;
}
