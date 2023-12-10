import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';

export class ApiCreateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '登录失效，请重新登录' })
  token: string;

  @ApiProperty({
    example: 7,
    required: true,
    description: '产品ID',
  })
  @IsNotEmpty({ message: '请选择购买的产品' })
  type: number;

  @ApiProperty({
    example: 7,
    required: true,
    description: '期号',
  })
  @IsNotEmpty({ message: '请重新下单' })
  numbers: number;

  @ApiProperty({
    example: [
      {
        codes: '1,2,3,4,5',
        counts: 1,
        amount: 2,
        total_amount: 2,
      },
    ],
    required: true,
    description: '购买项',
  })
  @IsNotEmpty({ message: '请选择购买项' })
  items: any;
}
