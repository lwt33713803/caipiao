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
import { LotteryTypesModule } from './lottery_types/lottery_types.module';
import { MessageModule } from './API/message/message.module';
import { MemberWalletOperationsModule } from './API/member_wallet_operations/member_wallet_operations.module';
import { RegisterModule } from './register/register.module';
import { OssModule } from './oss/oss.module';
import { MemberShopsModule } from './API/member_shops/member_shops.module';
import { MemberFeedbackModule } from './API/member-feedback/member-feedback.module';
import { MemberChargeModule } from './API/member-charge/member-charge.module';
import { MemberService } from './API/member/member.service';
import { MemberWalletOperationsService } from './API/member_wallet_operations/member_wallet_operations.service';
import { MemberWithdrawModule } from './API/member-withdraw/member-withdraw.module';
import { FollowModule } from './API/follow/follow.module';
import { AgencyModule } from './agency/agency.module';

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
    LotteryTypesModule,
    MessageModule,
    MemberWalletOperationsModule,
    RegisterModule,
    OssModule,
    MemberShopsModule,
    MemberFeedbackModule,
    MemberChargeModule,
    MemberWithdrawModule,
    FollowModule,
    AgencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
