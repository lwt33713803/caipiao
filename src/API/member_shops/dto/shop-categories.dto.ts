import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ShopCategiriesDto {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: '1',
    required: true,
    description: '店铺ID',
  })
  @IsNotEmpty({ message: '请填写店铺ID' })
  shop_id: string;
}
