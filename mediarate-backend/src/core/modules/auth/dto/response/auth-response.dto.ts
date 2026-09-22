import { UserResponseDto } from '@/core/modules/user/dto/response/user-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ type: UserResponseDto }) user: UserResponseDto;
  @ApiProperty() accessToken: string;
}
