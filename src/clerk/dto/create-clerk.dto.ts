import {
  IsString,
  IsOptional,
  IsArray,
  IsEmail,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClerkDto {
  @IsString()
  @ApiProperty({ description: '店铺id' })
  shop_id: string;


  @IsString()
  @ApiProperty({ description: '员工姓名', maxLength: 30 })
  clerk_name: string;

  @IsString()
  @ApiProperty({ description: '员工手机' })
  clerk_phone: string;

  @IsString()
  @ApiProperty({ description: '员工密码' })
  clerk_password: string;
}
