import { Module } from '@nestjs/common';
import { MemberShopsService } from './member_shops.service';
import { MemberShopsController } from './member_shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from '../member/member.module';
import { ShopsModule } from '../../shops/shops.module';
import { MemberShopSchema } from './schemas/member_shop.schema';

const table = MongooseModule.forFeature([
  {
    name: 'MemberShops',
    schema: MemberShopSchema,
  },
]);

@Module({
  imports: [table, MemberModule, ShopsModule],
  controllers: [MemberShopsController],
  providers: [MemberShopsService],
})
export class MemberShopsModule {}
