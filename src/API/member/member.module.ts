import { Module, forwardRef } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';
import { MemberWalletOperationsModule } from 'src/API/member_wallet_operations/member_wallet_operations.module';

const MemberTable = MongooseModule.forFeature([
  {
    name: 'member',
    schema: MemberSchema,
  },
]);

@Module({
  imports: [MemberTable, forwardRef(() => MemberWalletOperationsModule)],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
