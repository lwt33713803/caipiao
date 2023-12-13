import { Module } from '@nestjs/common';
import { ShopsDataService } from './shops_data.service';
import { ShopsDataController } from './shops_data.controller';
import { LogModule } from '../log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopsDataSchema } from './schemas/shops_data.schema';
import { OrderSchema } from 'src/order/schemas/order.schema';
import { LotterySchema } from 'src/lottery/schemas/lottery.schema';
import { MemberShopSchema } from 'src/API/member_shops/schemas/member_shop.schema';
import { MemberWithdrawSchema } from 'src/API/member-withdraw/schemas/member-withdraw.schema';
import { MemberChargeSchema } from 'src/API/member-charge/schemas/member-charge.schema';
import { ShopsAccountSchema } from 'src/shops_account/schemas/shops_account.schema';

const ShopsDataTable = MongooseModule.forFeature([
  {
    name: 'ShopsDataModel',
    schema: ShopsDataSchema,
  },
]);
const OrderTable = MongooseModule.forFeature([
  {
    name: 'OrderModel',
    schema: OrderSchema,
  },
]);
const LotteryTable = MongooseModule.forFeature([
  {
    name: 'LotteryModel',
    schema: LotterySchema,
  },
]);
const MemberTable = MongooseModule.forFeature([
  {
    name: 'MemberShops',
    schema: MemberShopSchema,
  },
]);
const WithdrawTable = MongooseModule.forFeature([
  {
    name: 'withdraw',
    schema: MemberWithdrawSchema,
  },
]);
const ChargeTable = MongooseModule.forFeature([
  {
    name: 'charges',
    schema: MemberChargeSchema,
  },
]);
const ShopsAccountTable = MongooseModule.forFeature([
  {
    name: 'ShopsAccountModel',
    schema: ShopsAccountSchema,
  },
]);
@Module({
  imports: [
    ShopsDataTable,
    OrderTable,
    LotteryTable,
    MemberTable,
    WithdrawTable,
    ChargeTable,
    ShopsAccountTable,
    LogModule,
  ],
  controllers: [ShopsDataController],
  providers: [ShopsDataService],
})
export class ShopsDataModule {}
