import { PartialType } from '@nestjs/swagger';
import { CreateMemberWalletOperationDto } from './create-member_wallet_operation.dto';

export class UpdateMemberWalletOperationDto extends PartialType(CreateMemberWalletOperationDto) {}
