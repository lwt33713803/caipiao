import {
  IsString,
  IsArray,
  IsNumber,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLotteryDto {
  @IsString()
  @ApiProperty({ description: '订单_id' })
  order_id: string;

  @IsString()
  @ApiProperty({ description: '用户_id', maxLength: 30 })
  user_id: string;

  @IsNumber()
  @ApiProperty({ description: '彩种' })
  type: number;

  @IsArray()
  @ApiProperty({ description: '中奖号' })
  items: any[];

  @IsString()
  @ApiProperty({ description: '下单时间' })
  order_time: string;

  @IsString()
  @ApiProperty({ description: '金额' })
  money: string;

  
  @IsString()
  @ApiProperty({ description: '中奖金额' })
  winning: string;

  @IsNumber()
  @ApiProperty({ description: '派奖类型' })
  winning_type: number;

  @IsNumber()
  @ApiProperty({ description: '派奖状态' })
  winning_status: number;

  // @IsDate()
  // @ApiProperty({ description: '创建时间' })
  // created_time: Date;

  // @IsDate()
  // @ApiProperty({ description: '更新时间' })
  // update_time: Date;
}
