import { PartialType } from '@nestjs/swagger';
import { CreateMemberChargeDto } from './create-member-charge.dto';

export class UpdateMemberChargeDto extends PartialType(CreateMemberChargeDto) {}
