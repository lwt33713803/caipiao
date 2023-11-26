import {
    IsBoolean,
  IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePlayerDto {
  @IsString()
  @ApiProperty({ description: '用户名', maxLength: 30 })
  name: string;

  @IsString()
  @ApiProperty({ description: '用户手机号', maxLength: 30 })
  phone: string;

  @IsString()
  @ApiProperty({ description: '用户头像', maxLength: 30 })
  avatar: string;

  @IsBoolean()
  @ApiProperty({ description: '星标'})
  star: boolean;

  @IsBoolean()
  @ApiProperty({ description: '自动审核'})
  audit: boolean;

  @IsString()
  @ApiProperty({ description: '创建时间', maxLength: 30 })
  createTime: string;

  @IsString()
  @ApiProperty({ description: '更新时间', maxLength: 30 })
  updateTime: string;
}

