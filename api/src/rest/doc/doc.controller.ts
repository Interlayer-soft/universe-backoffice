import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';
import { appConfig } from 'src/pkg/conf/app.config';

@Controller('docs')
export class DocController {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConf: ConfigType<typeof appConfig>,
  ) {}

  @Get()
  retrieve(@Res() res: Response) {
    return res.redirect(this.appConf.docUrl);
  }
}
