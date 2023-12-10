import { Module } from '@nestjs/common';
import { MemberWithdrawService } from './member-withdraw.service';
import { MemberWithdrawController } from './member-withdraw.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberWithdrawSchema } from './schemas/member-withdraw.schema';
import { MemberModule } from '../member/member.module';

const table = MongooseModule.forFeature([
  {
    name: 'withdraw',
    schema: MemberWithdrawSchema,
  },
]);

@Module({
  imports: [table, MemberModule],
  controllers: [MemberWithdrawController],
  providers: [MemberWithdrawService],
})
export class MemberWithdrawModule {}
