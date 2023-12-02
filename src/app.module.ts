import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CategoryModule } from './category/category.module';
import { LogModule } from './log/log.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { ShopsModule } from './shops/shops.module';
import { ClerkModule } from './clerk/clerk.module';
import { PlayerModule } from './player/player.module';
import { MemberModule } from './API/member/member.module';
import { ShopsDataModule } from './shops_data/shops_data.module';

import { ScheduleModule } from '@nestjs/schedule';
import { LotteryModule } from './lottery/lottery.module';
import { ShopsAccountModule } from './shops_account/shops_account.module';
import { MessageModule } from './API/message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongolcz001:mongopwd001%23%23%23@47.96.71.44:10002/?authMechanism=DEFAULT',
      // 'mongodb://localhost:27017',
    ),
    ScheduleModule.forRoot(),
    ProductModule,
    CategoryModule,
    LogModule,
    UsersModule,
    OrderModule,
    ShopsModule,
    ClerkModule,
    PlayerModule,
    MemberModule,
    ShopsDataModule,
    LotteryModule,
    ShopsAccountModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
