import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterMemberDto extends PartialType(CreateMemberDto) {
  @ApiProperty({ example: '123456', required: true, description: '注册密码' })
  @IsNotEmpty({ message: '请填写密码信息' })
  password: string;
  @ApiProperty({ example: '123456', required: true, description: '注册账户' })
  @IsNotEmpty({ message: '请填写登录账户' })
  phone: string;
  @ApiProperty({ example: '1234', required: false, description: '邀请码' })
  invite_code: string;
}
