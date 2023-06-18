import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IamService } from './iam.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {          
          return {
            ...configService.get('jwt'),
          };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [IamService],
  exports: [IamService],
})
export class IamModule {}
