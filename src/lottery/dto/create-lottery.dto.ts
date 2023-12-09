import { IsString, IsArray, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLotteryDto {
  @IsString()
  @ApiProperty({ description: '订单_id' })
  order_id: string;

  @IsString()
  @ApiProperty({ description: '用户_id' })
  user_id: string;

  @IsString()
  @ApiProperty({ description: '商家_id' })
  shop_id: string;

  @IsNumber()
  @ApiProperty({ description: '彩种', required: false })
  type: number;

  @IsArray()
  @ApiProperty({ description: '中奖号', required: false })
  items: any[];

  @IsString()
  @ApiProperty({ description: '下单时间', required: false })
  order_time: string;

  @IsString()
  @ApiProperty({ description: '金额', required: false })
  money: string;

  @IsString()
  @ApiProperty({ description: '中奖金额', required: false })
  winning: string;

  @IsNumber()
  @ApiProperty({ description: '派奖类型', required: false })
  winning_type: number;

  @IsNumber()
  @ApiProperty({ description: '派奖状态', required: false })
  winning_status: number;

  @IsString()
  @ApiProperty({ description: '彩票期号', required: false })
  expect: string;

  @IsString()
  @ApiProperty({ description: '发布时间', required: false })
  time: string;

  // @IsDate()
  // @ApiProperty({ description: '创建时间' })
  // created_time: Date;

  // @IsDate()
  // @ApiProperty({ description: '更新时间' })
  // update_time: Date;
}
