import { IsUsername } from '@/shared/decorators/is-username.decorator';
import { IsEmail, IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @IsUsername()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
