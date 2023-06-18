import { Module } from '@nestjs/common';
import { AuditLogModule } from './pkg/audit-log/audit-log.module';
import { ConfModule } from './pkg/conf/conf.module';
import { DbModule } from './pkg/db/db.module';
import { IamModule } from './pkg/iam/iam.module';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [AuditLogModule, ConfModule, IamModule, DbModule, RestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
