import { UserRole } from '@/generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() email: string;
  @ApiProperty() username: string;
  @ApiProperty() displayName: string;
  @ApiProperty({ enum: UserRole }) role: UserRole;
  @ApiProperty() avatarUrl?: string;
  @ApiProperty() bannerUrl?: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

export class UserReviewResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty() content: string;
  @ApiProperty() rating: number;
  @ApiProperty() userId: string;
  @ApiProperty() mediaId: string;
}

export class UserSessionResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() token: string;
  @ApiProperty() userId: string;
  @ApiProperty() expiresAt: Date;
  @ApiProperty() createdAt: Date;
  @ApiProperty({ type: Date, nullable: true }) revokedAt: Date | null;
}

export class UserPublicProfileResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() username: string;
  @ApiProperty({ type: String, nullable: true }) avatarUrl: string | null;
  @ApiProperty({ type: String, nullable: true }) bannerUrl: string | null;
  @ApiProperty() createdAt: Date;
  @ApiProperty({ type: [UserReviewResponseDto] })
  reviews: UserReviewResponseDto[];
}

export class UserPrivateProfileResponseDto extends UserPublicProfileResponseDto {
  @ApiProperty() email: string;
  @ApiProperty({ enum: UserRole }) role: UserRole;
  @ApiProperty({ type: [UserSessionResponseDto] })
  refreshTokens: UserSessionResponseDto[];
}
