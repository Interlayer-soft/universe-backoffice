import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Admin, AuditLogActivity, AuditLogResource } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'nestjs-prisma';
import { AuditLogService } from 'src/pkg/audit-log/audit-log.service';
import { OkResponse } from 'src/pkg/dto/ok.dto';
import { Iam } from 'src/pkg/iam/iam.decorator';
import { IamGuard } from 'src/pkg/iam/iam.guard';
import { IamService } from 'src/pkg/iam/iam.service';
import { LoginDto, LoginResponse } from './dto/login.auth.dto';
import { ProfileResponse } from './dto/profile.auth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly dbSvc: PrismaService,
    private readonly iamSvc: IamService,
    private readonly auditLogSvc: AuditLogService,
  ) {}

  @ApiCreatedResponse({
    type: LoginResponse,
  })
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const admin = await this.dbSvc.admin.findUnique({
      where: {
        username: body.username,
      },
    });
    if (!admin) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await this.iamSvc.validatePassword(
      body.password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = await this.iamSvc.createToken(admin);

    await this.auditLogSvc.create({
      performBy: admin,
      resource: AuditLogResource.AUTH,
      activity: AuditLogActivity.LOGIN,
    });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send(new OkResponse(true));
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: ProfileResponse,
  })
  @Get('profile')
  @UseGuards(IamGuard)
  async auth(@Iam() admin: Admin): Promise<ProfileResponse> {
    return new ProfileResponse(admin);
  }
}
