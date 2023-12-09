import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMemberFeedbackDto {
  @ApiProperty({
    example: 'skit2k2cwbd4RHsF76hHAGX5hnRWBBEe',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '获取失败，请重新登录' })
  token: string;

  @ApiProperty({
    example: '产品建议',
    required: true,
    description: 'token',
  })
  @IsNotEmpty({ message: '请选择反馈类型' })
  type: string;

  @ApiProperty({
    example: '内容内容内容内容内容',
    required: true,
    description: '反馈内容',
  })
  @IsNotEmpty({ message: '请输入反馈内容' })
  content: string;
}
