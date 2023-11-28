import { Module } from '@nestjs/common';
import { ShopsDataService } from './shops_data.service';
import { ShopsDataController } from './shops_data.controller';
import { LogModule } from '../log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopsDataSchema } from './schemas/shops_data.schema';

const ShopsDataTable = MongooseModule.forFeature([
  {
    name: 'ShopsDataModel',
    schema: ShopsDataSchema,
  },
]);

@Module({
  imports: [ShopsDataTable, LogModule],
  controllers: [ShopsDataController],
  providers: [ShopsDataService],
})
export class ShopsDataModule {}
