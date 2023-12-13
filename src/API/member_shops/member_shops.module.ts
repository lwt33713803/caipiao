import { Module } from '@nestjs/common';
import { MemberShopsService } from './member_shops.service';
import { MemberShopsController } from './member_shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from '../member/member.module';
import { ShopsModule } from '../../shops/shops.module';
import { AgencyModule } from '../../agency/agency.module';
import { MemberShopSchema } from './schemas/member_shop.schema';
import { LotteryTypesModule } from 'src/lottery_types/lottery_types.module';

const table = MongooseModule.forFeature([
  {
    name: 'MemberShops',
    schema: MemberShopSchema,
  },
]);

@Module({
  imports: [table, MemberModule, ShopsModule, LotteryTypesModule, AgencyModule],
  controllers: [MemberShopsController],
  providers: [MemberShopsService],
})
export class MemberShopsModule {}
