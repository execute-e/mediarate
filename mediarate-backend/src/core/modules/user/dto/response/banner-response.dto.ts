import { ApiProperty } from '@nestjs/swagger';

export class BannerResponseDto {
  @ApiProperty() bannerUrl: string;
}
