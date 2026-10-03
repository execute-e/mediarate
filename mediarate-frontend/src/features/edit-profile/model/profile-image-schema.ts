import z from "zod";

// same limits as on backend (user.const.ts)
const PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PROFILE_IMAGE_MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const PROFILE_IMAGE_ACCEPT = PROFILE_IMAGE_TYPES.join(",");

export const profileImageSchema = z
  .file()
  .mime(PROFILE_IMAGE_TYPES, "Only JPEG, PNG or WebP images are allowed")
  .max(PROFILE_IMAGE_MAX_SIZE, "Image must be smaller than 5MB");
