import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { CookieService } from './services/cookie.service';
import { RefreshToken } from './decorators/refresh-token.decorator';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const { refreshToken, ...data } = await this.authService.register(dto);
    this.cookieService.setRefreshToken(res, refreshToken);
    return data;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    const { refreshToken, ...data } = await this.authService.login(dto);
    this.cookieService.setRefreshToken(res, refreshToken);
    return data;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(
    @Res({ passthrough: true }) res: Response,
    @RefreshToken() refreshToken: string,
  ) {
    await this.authService.logout(refreshToken);
    this.cookieService.clearRefreshCookie(res);

    return {};
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refresh(
    @Res({ passthrough: true }) res: Response,
    @RefreshToken() refreshToken: string,
  ) {
    const tokens = await this.authService.refresh(refreshToken);

    this.cookieService.setRefreshToken(res, tokens.refreshToken);

    return { accessToken: tokens.accessToken };
  }
}
