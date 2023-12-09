import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { LogModule } from '../log/log.module';
import { LotteryTypesSchema } from '../lottery_types/schemas/lottery_types.schema';
import { ShopsSchema } from '../shops/schemas/shops.schema';

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

@Module({
  imports: [UsersTable, LotteryTypesTable, ShopsTable, LogModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
