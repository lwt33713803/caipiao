import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DetailMemberShopDto {
  @ApiProperty({
    example: '1',
    required: true,
    description: '商铺ID',
  })
  @IsNotEmpty({ message: '商铺ID' })
  shop_id: string;
}
