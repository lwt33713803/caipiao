import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { LogModule } from '../log/log.module';
import { MemberModule } from 'src/API/member/member.module';
import { MemberWalletOperationsModule } from 'src/API/member_wallet_operations/member_wallet_operations.module';
import { ShopsAccountSchema } from 'src/shops_account/schemas/shops_account.schema';
import { ShopsSchema } from 'src/shops/schemas/shops.schema';
import { LotterySchema } from 'src/lottery/schemas/lottery.schema';

const OrderTable = MongooseModule.forFeature([
  {
    name: 'OrderModel',
    schema: OrderSchema,
  },
]);
const ShopsAccountTable = MongooseModule.forFeature([
  {
    name: 'ShopsAccountModel',
    schema: ShopsAccountSchema,
  },
]);
const ShopsTable = MongooseModule.forFeature([
  {
    name: 'ShopsModel',
    schema: ShopsSchema,
  },
]);
const LotteryTable = MongooseModule.forFeature([
  {
    name: 'LotteryModel',
    schema: LotterySchema,
  },
]);

@Module({
  imports: [
    OrderTable,
    ShopsAccountTable,
    ShopsTable,
    LotteryTable,
    LogModule,
    MemberModule,
    MemberWalletOperationsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
