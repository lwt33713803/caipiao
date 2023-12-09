import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto extends PartialType(CreateMemberDto) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: '123456',
    required: true,
    description: '旧密码',
  })
  @IsNotEmpty({ message: '请输入旧密码' })
  oldPassword: string;

  @ApiProperty({
    example: '123456',
    required: true,
    description: '新密码',
  })
  @IsNotEmpty({ message: '请输入新密码' })
  password: string;
}
