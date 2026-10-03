import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.respository';
import { UserService } from './user.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
