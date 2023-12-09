import { PartialType } from '@nestjs/swagger';
import { CreateMemberWithdrawDto } from './create-member-withdraw.dto';

export class UpdateMemberWithdrawDto extends PartialType(CreateMemberWithdrawDto) {}
