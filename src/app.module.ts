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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongolcz001:mongopwd001%23%23%23@47.96.71.44:10002/?authMechanism=DEFAULT',
    ),
    ProductModule,
    CategoryModule,
    LogModule,
    UsersModule,
    OrderModule,
    ShopsModule,
    ClerkModule,
    PlayerModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
