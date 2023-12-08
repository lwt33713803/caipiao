import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class AcceptDto {
  @ApiProperty({
    example: '1',
    description: '用户ID ',
  })
  @ApiProperty({ required: true, description: '订单ID' })
  @IsNotEmpty()
  _id: string;

  @ApiProperty({ required: false, description: '商家ID' })
  shop_id?: string;
}
