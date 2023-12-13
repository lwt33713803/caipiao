import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';

export class ApiGetOrderDetailDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '登录失效，请重新登录' })
  token: string;

  @ApiProperty({
    example: '1',
    required: true,
    description: '订单 ID',
  })
  @IsNotEmpty({ message: '请选择订单 ID' })
  order_id: string;
}
