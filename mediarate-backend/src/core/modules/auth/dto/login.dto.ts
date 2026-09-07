import { IsUsername } from '@/shared/decorators/is-username.decorator';
import { IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsUsername()
  username: string;

  @IsStrongPassword()
  password: string;
}
