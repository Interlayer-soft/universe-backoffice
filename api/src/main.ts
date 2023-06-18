import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_CONFIG_KEY, appConfig } from './pkg/conf/app.config';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get('Reflector'), {
      excludeExtraneousValues: true,
    }),
  );
  const appConf =
    configService.get<ConfigType<typeof appConfig>>(APP_CONFIG_KEY);

  await app.listen(appConf.port, () => {
    logger.log(`Listening on port ${appConf.port}`);
  });
}
bootstrap();
