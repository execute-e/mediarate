import { applyDecorators } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export function IsUsername() {
  return applyDecorators(
    IsNotEmpty(),
    IsString(),
    MaxLength(32),
    MinLength(4),
    Matches(/^[a-zA-Z0-9_]+$/, {
      message: 'Username may contain only latin letters, numbers and _',
    }),
  );
}
