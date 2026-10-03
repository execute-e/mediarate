import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import {
  IMAGE_MAX_SIDE,
  UPLOADS_ROOT,
  WEBP_QUALITY,
} from './const/storage.const';
import { StorageFolder, UploadedFile } from './types/storage.types';

@Injectable()
export class StorageService {
  constructor(private readonly config: ConfigService) {}

  async save(file: UploadedFile, folder: StorageFolder): Promise<string> {
    const image = await this.toWebp(file.buffer, IMAGE_MAX_SIDE[folder]);

    const dir = join(UPLOADS_ROOT, folder);
    await mkdir(dir, { recursive: true });

    const filename = `${randomUUID()}.webp`;
    await writeFile(join(dir, filename), image);

    return filename;
  }

  async delete(filename: string, folder: StorageFolder): Promise<void> {
    try {
      await unlink(join(UPLOADS_ROOT, folder, filename));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
  }

  getPublicUrl(filename: string, folder: StorageFolder): string {
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return `${baseUrl}/uploads/${folder}/${filename}`;
  }

  private async toWebp(buffer: Buffer, maxSide: number): Promise<Buffer> {
    try {
      return await sharp(buffer)
        // metadata is stripped on output, so apply EXIF rotation first
        .autoOrient()
        .resize(maxSide, maxSide, { fit: 'cover' })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();
    } catch {
      throw new BadRequestException('File is not a valid image');
    }
  }
}
