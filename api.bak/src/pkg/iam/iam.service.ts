import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { DbService } from '../db/db.service';
@Injectable()
export class IamService {
  constructor(
    private readonly dbSvc: DbService,
    private readonly jwtSvc: JwtService,
  ) {}

  async createToken(admin: Admin) {
    const payload = { id: admin.id };
    return this.jwtSvc.sign(payload);
  }

  async validatePassword(password: string, hashedPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  }

  async validateAdmin(id: string) {
    const user = await this.dbSvc.admin.findUniqueOrThrow({ where: { id } });
    return user;
  }
}
