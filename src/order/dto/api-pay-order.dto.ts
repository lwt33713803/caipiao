import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';

export class ApiPayOrderDto extends PartialType(CreateOrderDto) {
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
    description: '订单ID',
  })
  @IsNotEmpty({ message: '请选择结算订单' })
  order_id: string;
}
