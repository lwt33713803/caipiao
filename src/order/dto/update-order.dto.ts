import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class AcceptDto {
  @ApiProperty({
    example: '1',
    description: '用户ID ',
  })
  @IsNotEmpty()
  _id: string;
}
