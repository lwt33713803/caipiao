import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ListMemberShopDto {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;
}
