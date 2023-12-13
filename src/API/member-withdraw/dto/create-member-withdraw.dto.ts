import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMemberWithdrawDto {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: '1',
    required: true,
    description: '提现金额',
  })
  @IsNotEmpty({ message: '请填写提现金额' })
  amount: number;

  @ApiProperty({
    example: '微信',
    required: true,
    description: '提现方式',
  })
  @IsNotEmpty({ message: '请选择提现方式' })
  account: string;
}
