import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: '平台信息不能为空' })
  platform: string;
}
