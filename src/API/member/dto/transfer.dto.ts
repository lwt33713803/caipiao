import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty } from 'class-validator';

export class TransferDto extends PartialType(CreateMemberDto) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: '15165011111',
    required: true,
    description: '手机',
  })
  @IsNotEmpty({ message: '请填写接收方手机' })
  phone: string;

  @ApiProperty({
    example: '1',
    required: true,
    description: '转账金额',
  })
  @IsNotEmpty({ message: '请填写转账金额' })
  amount: number;
}
