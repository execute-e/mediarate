import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.respository';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserRole } from '@/generated/prisma/enums';
import { User } from '@/generated/prisma/client';
import { StorageService } from '../storage/storage.service';
import { StorageFolder, UploadedFile } from '../storage/types/storage.types';
import {
  USER_PRIVATE_PROFILE_SELECT,
  USER_PUBLIC_PROFILE_SELECT,
} from './const/user.const';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly storageService: StorageService,
  ) {}

  public async create(dto: CreateUserDto) {
    return this.userRepository.create({
      ...dto,
      role: UserRole.USER,
      displayName: dto.username,
    });
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

  public async updateProfile(userId: string, dto: UpdateUserDto) {
    return this.userRepository.update(userId, dto);
  }

  public async updateUsername(id: string, newUsername: string) {
    return this.userRepository.update(id, { username: newUsername });
  }

  public async updateAvatar(userId: string, file: UploadedFile) {
    return this.updateImage(userId, file, 'avatars', 'avatarUrl');
  }

  public async updateBanner(userId: string, file: UploadedFile) {
    return this.updateImage(userId, file, 'banners', 'bannerUrl');
  }

  public async delete(id: string) {
    return this.userRepository.delete(id);
  }

  public async getUserProfile(username: string) {
    const user = await this.userRepository.findOneWithSelect(
      { username },
      USER_PUBLIC_PROFILE_SELECT,
    );

    if (!user) {
      throw new BadRequestException('User with this username does not exist');
    }

    return this.withImageUrls(user);
  }

  public async getUserProfileById(userId: string) {
    const user = await this.userRepository.findOneWithSelect(
      { id: userId },
      USER_PRIVATE_PROFILE_SELECT,
    );

    return user && this.withImageUrls(user);
  }

  // DB stores only filenames, client needs full urls
  public withImageUrls<T extends Pick<User, 'avatarUrl' | 'bannerUrl'>>(
    user: T,
  ): T {
    const { avatarUrl, bannerUrl } = user;

    return {
      ...user,
      avatarUrl:
        avatarUrl && this.storageService.getPublicUrl(avatarUrl, 'avatars'),
      bannerUrl:
        bannerUrl && this.storageService.getPublicUrl(bannerUrl, 'banners'),
    };
  }

  private async updateImage(
    userId: string,
    file: UploadedFile,
    folder: StorageFolder,
    field: 'avatarUrl' | 'bannerUrl',
  ) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID: ${userId} not found`);
    }

    const previousFilename = user[field];
    const filename = await this.storageService.save(file, folder);

    await this.userRepository.update(userId, { [field]: filename });

    if (previousFilename) {
      await this.storageService.delete(previousFilename, folder);
    }

    return { [field]: this.storageService.getPublicUrl(filename, folder) };
  }
}
