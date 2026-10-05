import { hours, minutes } from '@nestjs/throttler';

export const DEFAULT_THROTTLE = { ttl: minutes(1), limit: 100 };

export const LOGIN_THROTTLE = { default: { ttl: minutes(1), limit: 5 } };
export const REGISTER_THROTTLE = { default: { ttl: hours(1), limit: 5 } };

// image processing (sharp) is the most cpu-heavy operation in the app
export const IMAGE_UPLOAD_THROTTLE = {
  default: { ttl: minutes(1), limit: 10 },
};
