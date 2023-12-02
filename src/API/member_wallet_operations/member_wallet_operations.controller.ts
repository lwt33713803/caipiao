import { Controller } from '@nestjs/common';
import { MemberWalletOperationsService } from './member_wallet_operations.service';

@Controller('member-wallet-operations')
export class MemberWalletOperationsController {
  constructor(
    private readonly memberWalletOperationsService: MemberWalletOperationsService,
  ) {}
}
