import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from '@/generated/prisma/enums';
import { Auth } from '@/shared/decorators/auth.decorator';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Auth(UserRole.ADMIN)
  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  // @Patch(':id')
  // public async changeUsername(username: string) {
  //   return this.userService.updateUsername(id, username);
  // }
}
