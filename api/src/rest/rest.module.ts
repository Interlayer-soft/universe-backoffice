import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuthModule } from './auth/auth.module';
import { DocModule } from './doc/doc.module';

@Module({
  imports: [AdminModule, AuthModule, AuditLogModule, DocModule],
})
export class RestModule {}
