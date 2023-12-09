import { Module } from '@nestjs/common';
import { MemberChargeService } from './member-charge.service';
import { MemberChargeController } from './member-charge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberChargeSchema } from './schemas/member-charge.schema';
import { MemberModule } from '../member/member.module';

const table = MongooseModule.forFeature([
  {
    name: 'charges',
    schema: MemberChargeSchema,
  },
]);

@Module({
  imports: [table, MemberModule],
  controllers: [MemberChargeController],
  providers: [MemberChargeService],
})
export class MemberChargeModule {}
