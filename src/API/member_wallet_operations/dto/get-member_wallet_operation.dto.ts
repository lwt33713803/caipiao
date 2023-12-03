import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberWalletOperationDto } from './create-member_wallet_operation.dto';
import { IsNotEmpty } from 'class-validator';

export class GetMemberWalletOperationDto extends PartialType(
  CreateMemberWalletOperationDto,
) {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '登录失效，请重新登录' })
  token: string;
}
