import { IsDisplayName } from '@/shared/decorators/is-display-name.decorator';

export class UpdateUserDto {
  @IsDisplayName()
  displayName?: string;
}
