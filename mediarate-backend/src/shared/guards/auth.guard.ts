import { MyJwtService } from '@/core/modules/jwt/my-jwt.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly myJwtService: MyJwtService) {}

  public async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const token = this.extractAccessToken(req);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const payload = await this.myJwtService.verify(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    req.user = payload;
    return true;
  }

  private extractAccessToken(req: Request) {
    const header = req.headers.authorization;
    if (!header) {
      return undefined;
    }

    const [type, token] = header.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
