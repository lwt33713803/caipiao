import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopsSchema } from './schemas/shops.schema';
import { LogModule } from '../log/log.module';

const ShopsTable = MongooseModule.forFeature([
  {
    name: 'ShopsModel',
    schema: ShopsSchema,
  },
]);



@Module({
  imports: [ShopsTable, LogModule],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
