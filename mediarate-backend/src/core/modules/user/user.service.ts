import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@/generated/prisma/enums';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async create(dto: CreateUserDto) {
    return this.userRepository.create({ ...dto, role: UserRole.USER });
  }

  public async findOneById(id: string) {
    return this.userRepository.findById(id);
  }

  public async findOneByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  public async findOneByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  public async findAll() {
    // here can be added filters for admin page or something similar
    return this.userRepository.findAll();
  }

  public async updateUsername(id: string, newUsername: string) {
    return this.userRepository.update(id, { username: newUsername });
  }

  public async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
