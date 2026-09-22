import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../user/dto/request/create-user.dto';
import { LoginDto } from './dto/request/login.dto';
import { Response } from 'express';
import { CookieService } from './services/cookie.service';
import { RefreshToken } from './decorators/refresh-token.decorator';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/response/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: AuthResponse,
    description: 'User registered, session created',
  })
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
  @ApiOkResponse({
    type: AuthResponse,
    description: 'Successfull login, session created',
  })
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
  @ApiNoContentResponse({ description: 'Session ended' })
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
  @ApiOkResponse({
    description: 'Токены обновлены',
    schema: { properties: { accessToken: { type: 'string' } } },
  })
  public async refresh(
    @Res({ passthrough: true }) res: Response,
    @RefreshToken() refreshToken: string,
  ) {
    const tokens = await this.authService.refresh(refreshToken);

    this.cookieService.setRefreshToken(res, tokens.refreshToken);

    return { accessToken: tokens.accessToken };
  }
}
