import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterMemberDto extends PartialType(CreateMemberDto) {
  @IsNotEmpty({ message: '请填写密码信息' })
  password: string;
  @IsNotEmpty({ message: '请填写登录账户' })
  phone: string;
}
