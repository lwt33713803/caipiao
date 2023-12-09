import { PartialType } from '@nestjs/swagger';
import { CreateMemberShopDto } from './create-member_shop.dto';

export class UpdateMemberShopDto extends PartialType(CreateMemberShopDto) {}
