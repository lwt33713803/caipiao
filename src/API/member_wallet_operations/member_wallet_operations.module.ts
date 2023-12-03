import { Module } from '@nestjs/common';
import { MemberWalletOperationsService } from './member_wallet_operations.service';
import { MemberWalletOperationsController } from './member_wallet_operations.controller';
import { MemberWalletOperationSchema } from './schemas/member_wallet_operations.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from '../member/member.module';

const table = MongooseModule.forFeature([
  {
    name: 'MemberWalletOperation',
    schema: MemberWalletOperationSchema,
  },
]);

@Module({
  imports: [table, MemberModule],
  controllers: [MemberWalletOperationsController],
  providers: [MemberWalletOperationsService],
  exports: [MemberWalletOperationsService],
})
export class MemberWalletOperationsModule {}
