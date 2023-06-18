import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Iam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const admin = request.admin;

    return data ? admin?.[data] : admin;
  },
);
