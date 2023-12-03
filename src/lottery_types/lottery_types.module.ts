import { Module } from '@nestjs/common';
import { LotteryTypesService } from './lottery_types.service';
import { LotteryTypesController } from './lottery_types.controller';
import { LogModule } from '../log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryTypesSchema } from './schemas/lottery_types.schema';

const LotteryTypesTable = MongooseModule.forFeature([
  {
    name: 'LotteryTypesModel',
    schema: LotteryTypesSchema,
  },
]);

@Module({
  imports: [LotteryTypesTable, LogModule],
  controllers: [LotteryTypesController],
  providers: [LotteryTypesService],
})
export class LotteryTypesModule {}
