import { IsString, IsArray, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UseLotteryDto {
  @IsString()
  @ApiProperty({ description: '订单_id' })
  order_id: string;

  @IsString()
  @ApiProperty({ description: '用户_id' })
  user_id: string;

  @IsString()
  @ApiProperty({ description: '商家_id' })
  shop_id: string;

}
