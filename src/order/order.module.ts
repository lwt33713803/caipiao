import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { LogModule } from '../log/log.module';


const OrderTable = MongooseModule.forFeature([
  {
    name: 'OrderModel',
    schema: OrderSchema,
  },
]);

@Module({
  imports: [OrderTable, LogModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
