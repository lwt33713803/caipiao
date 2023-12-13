import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BindSubordinate {
  @IsNotEmpty({ message: '请填写店铺ID' })
  shop_id: string;

  @IsNotEmpty({ message: '请填写用户ID' })
  member_id: string;
}
