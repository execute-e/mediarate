import { normalizeIp, ThrottlerGetTrackerFunction } from '@nestjs/throttler';
import { Request } from 'express';
import { createHash, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';

export function createThrottlerTracker(
  expectedSecret: string,
): ThrottlerGetTrackerFunction {
  const expectedHash = createHash('sha256').update(expectedSecret).digest();

  const isValidSecret = (received: string) =>
    timingSafeEqual(
      createHash('sha256').update(received).digest(),
      expectedHash,
    );

  return (req) => {
    const request = req as Request;
    const secret = request.headers['x-internal-secret'];
    const clientIp = request.headers['x-client-ip'];

    if (
      typeof secret === 'string' &&
      isValidSecret(secret) &&
      typeof clientIp === 'string' &&
      isIP(clientIp)
    ) {
      return normalizeIp(clientIp);
    }
    return normalizeIp(request.ip ?? '');
  };
}
