import { Logger, Module } from '@nestjs/common';
import { PrismaModule, QueryInfo, loggingMiddleware } from 'nestjs-prisma';
import { AuditLogModule } from './pkg/audit-log/audit-log.module';
import { ConfModule } from './pkg/conf/conf.module';
import { IamModule } from './pkg/iam/iam.module';
import { RestModule } from './rest/rest.module';
@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug', // default is `debug`
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} +${query.executionTime}ms`,
          }),
        ],
      },
    }),
    AuditLogModule,
    ConfModule,
    IamModule,
    RestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
