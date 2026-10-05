import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserRole } from '@/generated/prisma/enums';
import { Auth } from '@/shared/decorators/auth.decorator';
import { UploadedFile as UploadedImageFile } from '../storage/types/storage.types';
import { IMAGE_MIME_TYPE_REGEX, MAX_IMAGE_SIZE } from './const/user.const';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  UserPrivateProfileResponseDto,
  UserPublicProfileResponseDto,
} from './dto/response/user-response.dto';
import { AvatarResponseDto } from './dto/response/avatar-response.dto';
import { BannerResponseDto } from './dto/response/banner-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { Throttle } from '@nestjs/throttler';
import { IMAGE_UPLOAD_THROTTLE } from '@/shared/const/throttle.const';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Auth(UserRole.ADMIN)
  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  @Auth()
  @Get('profile')
  @ApiOkResponse({
    type: UserPrivateProfileResponseDto,
    description: 'Profile received',
  })
  public async getProfile(@Req() req: Request) {
    return this.userService.getUserProfileById(req.user.userId);
  }

  // update those parts of profile that dont need to be verified
  @Auth()
  @Patch('profile')
  @ApiOkResponse()
  public async updateProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.userId, dto);
  }

  @Get('profile/:username')
  @ApiOkResponse({
    type: UserPublicProfileResponseDto,
    description: 'Profile received',
  })
  public async getUserProfile(@Param('username') username: string) {
    return this.userService.getUserProfile(username);
  }

  @Auth()
  @Throttle(IMAGE_UPLOAD_THROTTLE)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    type: AvatarResponseDto,
    description: 'Avatar updated',
  })
  public async updateAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE }),
          new FileTypeValidator({ fileType: IMAGE_MIME_TYPE_REGEX }),
        ],
      }),
    )
    file: UploadedImageFile,
    @Req() req: Request,
  ) {
    return this.userService.updateAvatar(req.user.userId, file);
  }

  @Auth()
  @Throttle(IMAGE_UPLOAD_THROTTLE)
  @Patch('banner')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    type: BannerResponseDto,
    description: 'Banner updated',
  })
  public async updateBanner(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE }),
          new FileTypeValidator({ fileType: IMAGE_MIME_TYPE_REGEX }),
        ],
      }),
    )
    file: UploadedImageFile,
    @Req() req: Request,
  ) {
    return this.userService.updateBanner(req.user.userId, file);
  }
}
