import { UserRole } from '@/generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() email: string;
  @ApiProperty() username: string;
  @ApiProperty({ enum: UserRole }) role: UserRole;
}
