import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: '更新失败，请刷新页面后重新尝试！' })
  _id: string;
  @IsNotEmpty({ message: '更新失败，请输入有效账户信息！' })
  password: string;
}
