import { IsUsername } from '@/shared/decorators/is-username.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsUsername()
  username: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
