import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  // @Patch(':id')
  // public async changeUsername(username: string) {
  //   return this.userService.updateUsername(id, username);
  // }
}
