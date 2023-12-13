import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class BindWechartDto extends PartialType(CreateMemberDto) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: '123456',
    required: false,
    description: '支付宝账号',
  })
  ali: string;

  @ApiProperty({
    example: '123456',
    required: false,
    description: ' 微信账号',
  })
  wechart: string;
}
