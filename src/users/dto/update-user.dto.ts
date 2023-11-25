import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: '更新失败，请刷新页面后重新尝试！' })
  _id: string;
  @IsNotEmpty({ message: '更新失败，请输入有效账户信息！' })
  name: string;
  @IsNotEmpty({ message: '更新失败，请选择账户状态！' })
  state: string;
  avatar?: string;
  shop_id?: string;
}
