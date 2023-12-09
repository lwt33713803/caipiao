import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class ChangeCertDto extends PartialType(CreateMemberDto) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: 'zhangsan',
    required: true,
    description: '姓名',
  })
  @IsNotEmpty({ message: '请填写姓名' })
  name: string;

  @ApiProperty({
    example: '123456',
    required: true,
    description: '身份ID',
  })
  @IsNotEmpty({ message: '请填写身份ID' })
  code: string;
}
