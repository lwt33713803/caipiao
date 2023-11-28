import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class LoginMemberDto extends PartialType(CreateMemberDto) {
  @ApiProperty({ example: '123456', required: true, description: '登录密码' })
  @IsNotEmpty({ message: '请填写密码信息' })
  password: string;
  @ApiProperty({ example: '123456', required: true, description: '登录账户' })
  @IsNotEmpty({ message: '请填写登录账户' })
  phone: string;
}
