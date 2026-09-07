import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.respository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
