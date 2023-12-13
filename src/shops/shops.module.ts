import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopsSchema } from './schemas/shops.schema';
import { LogModule } from '../log/log.module';
import { ShopsAccountSchema } from 'src/shops_account/schemas/shops_account.schema';

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
  imports: [ShopsTable,ShopsAccountTable, LogModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
