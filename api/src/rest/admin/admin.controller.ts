import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Admin, AuditLogActivity, AuditLogResource } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'nestjs-prisma';
import { AuditLogService } from 'src/pkg/audit-log/audit-log.service';
import { ByIdDto } from 'src/pkg/dto/by-id.dto';
import { OkResponse } from 'src/pkg/dto/ok.dto';
import { Iam } from 'src/pkg/iam/iam.decorator';
import { IamGuard } from 'src/pkg/iam/iam.guard';
import { CreateAdminDto } from './dto/create.admin.dto';
import { RetrieveAdminResponse } from './dto/retrieve.admin.dto';
import { UpdateAdminPwdDto } from './dto/update-pwd.admin.dto';

@ApiTags('admins')
@ApiBearerAuth()
@UseGuards(IamGuard)
@Controller('admins')
export class AdminController {
  constructor(
    private readonly dbSvc: PrismaService,
    private readonly auditLogSvc: AuditLogService,
  ) {}

  @ApiCreatedResponse({
    type: OkResponse,
  })
  @Post()
  async create(
    @Iam() admin: Admin,
    @Body() body: CreateAdminDto,
  ): Promise<OkResponse> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await this.dbSvc.admin.create({
      data: {
        username: body.username,
        password: hashedPassword,
        createdBy: {
          connect: {
            id: admin.id,
          },
        },
      },
    });

    await this.auditLogSvc.create({
      performBy: admin,
      resource: AuditLogResource.ADMIN,
      activity: AuditLogActivity.CREATE,
    });

    return new OkResponse(true);
  }

  @ApiOkResponse({
    isArray: true,
    type: RetrieveAdminResponse,
  })
  @Get()
  async list(@Iam() admin: Admin): Promise<RetrieveAdminResponse[]> {
    const admins = await this.dbSvc.admin.findMany({
      where: {
        id: {
          not: admin.id,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: { createdBy: true, updatedBy: true },
    });

    return admins.map((admin) => new RetrieveAdminResponse(admin));
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    type: RetrieveAdminResponse,
  })
  @Get('/:id')
  async get(@Param() param: ByIdDto): Promise<RetrieveAdminResponse> {
    const admin = await this.dbSvc.admin.findUniqueOrThrow({
      where: { id: param.id },
      include: { createdBy: true, updatedBy: true },
    });

    return new RetrieveAdminResponse(admin);
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    type: OkResponse,
  })
  @Patch('/:id/pwd')
  async updatePwd(
    @Iam() admin: Admin,
    @Param() param: ByIdDto,
    @Body() body: UpdateAdminPwdDto,
  ): Promise<OkResponse> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await this.dbSvc.admin.update({
      where: { id: param.id },
      data: {
        password: hashedPassword,
        updatedBy: { connect: { id: admin.id } },
      },
    });

    await this.auditLogSvc.create({
      performBy: admin,
      resource: AuditLogResource.ADMIN,
      activity: AuditLogActivity.UPDATE_PASSWORD,
    });

    return new OkResponse(true);
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    type: OkResponse,
  })
  @Delete(':id')
  async delete(
    @Iam() admin: Admin,
    @Param() param: ByIdDto,
  ): Promise<OkResponse> {
    await this.dbSvc.admin.delete({ where: { id: param.id } });

    await this.auditLogSvc.create({
      performBy: admin,
      resource: AuditLogResource.ADMIN,
      activity: AuditLogActivity.DELETE,
    });
    return new OkResponse(true);
  }
}
