import { Module } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { LotteryController } from './lottery.controller';
import { LotterySchema } from './schemas/lottery.schema';
import { LogModule } from '../log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../order/schemas/order.schema';
import { ShopsSchema } from '../shops/schemas/shops.schema';
import { ShopsAccountSchema } from '../shops_account/schemas/shops_account.schema';

const LotteryTable = MongooseModule.forFeature([
  {
    name: 'LotteryModel',
    schema: LotterySchema,
  },
]);

const OrderTable = MongooseModule.forFeature([
  { name: 'OrderModel', schema: OrderSchema },
]);

const ShopsTable = MongooseModule.forFeature([
  {
    name: 'ShopsModel',
    schema: ShopsSchema,
  },
]);

const ShopsAccountTable = MongooseModule.forFeature([
  {
    name: 'ShopsAccountModel',
    schema: ShopsAccountSchema,
  },
]);

@Module({
  imports: [LotteryTable, OrderTable,ShopsTable,ShopsAccountTable, LogModule],
  controllers: [LotteryController],
  providers: [LotteryService],
})
export class LotteryModule {}
