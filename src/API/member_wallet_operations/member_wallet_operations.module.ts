import { Module } from '@nestjs/common';
import { MemberWalletOperationsService } from './member_wallet_operations.service';
import { MemberWalletOperationsController } from './member_wallet_operations.controller';

@Module({
  controllers: [MemberWalletOperationsController],
  providers: [MemberWalletOperationsService],
})
export class MemberWalletOperationsModule {}
