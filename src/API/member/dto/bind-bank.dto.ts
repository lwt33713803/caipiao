import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class BindBankDto extends PartialType(CreateMemberDto) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: 'abc银行',
    required: false,
    description: '银行名称',
  })
  bank_name: string;

  @ApiProperty({
    example: '开户行',
    required: false,
    description: '开户行信息',
  })
  bank_open: string;

  @ApiProperty({
    example: 'zhangsan',
    required: false,
    description: '银行名称',
  })
  name: string;

  @ApiProperty({
    example: ' 12312313',
    required: false,
    description: '银行账号',
  })
  account: string;
}
