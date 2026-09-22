import { IsUsername } from '@/shared/decorators/is-username.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsUsername()
  username: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
