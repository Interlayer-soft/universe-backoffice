import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConfig } from '../conf/jwt.config';
import { IamService } from './iam.service';

@Injectable()
export class IamGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly iamSvc: IamService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConf.secret,
      });

      const admin = await this.iamSvc.validateAdmin(payload.id);
      if (!admin) throw new UnauthorizedException();
      request['admin'] = admin;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(req: Request): string | undefined {
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return undefined;
  }
}
