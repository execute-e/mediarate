import { join } from 'node:path';
import { StorageFolder } from '../types/storage.types';

export const UPLOADS_ROOT = join(process.cwd(), 'uploads');

export const WEBP_QUALITY = 80;

// max length of the longest side in px, smaller images are not upscaled
export const IMAGE_MAX_SIDE: Record<StorageFolder, number> = {
  avatars: 512,
  banners: 1920,
};
