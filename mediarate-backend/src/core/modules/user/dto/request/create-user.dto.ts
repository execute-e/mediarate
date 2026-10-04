import { IsEmailTransform } from '@/shared/decorators/is-email-transform.decorator';
import { IsUsername } from '@/shared/decorators/is-username.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsUsername()
  username: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsEmailTransform()
  email: string;
}
