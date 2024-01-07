import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { LogModule } from '../log/log.module';
import { ShopsModule } from '../shops/shops.module';
import { LotteryTypesSchema } from '../lottery_types/schemas/lottery_types.schema';
import { ShopsSchema } from '../shops/schemas/shops.schema';
import { ClerkSchema } from 'src/clerk/schemas/clerk.schema';

const UsersTable = MongooseModule.forFeature([
  {
    name: 'UsersModel',
    schema: UsersSchema,
  },
]);

const LotteryTypesTable = MongooseModule.forFeature([
  {
    name: 'LotteryTypesModel',
    schema: LotteryTypesSchema,
  },
]);
const ShopsTable = MongooseModule.forFeature([
  {
    name: 'ShopsModel',
    schema: ShopsSchema,
  },
]);

const ClerkTable = MongooseModule.forFeature([
  {
    name: 'ClerkModel',
    schema: ClerkSchema,
  },
]);

@Module({
  imports: [
    UsersTable,
    LotteryTypesTable,
    ShopsTable,
    ClerkTable,
    LogModule,
    ShopsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
