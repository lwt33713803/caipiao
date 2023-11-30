import { Module } from '@nestjs/common';
import { ShopsAccountService } from './shops_account.service';
import { ShopsAccountController } from './shops_account.controller';
import { ShopsAccountSchema } from './schemas/shops_account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LogModule } from '../log/log.module';

const ShopsAccountTable = MongooseModule.forFeature([
  {
    name: 'ShopsAccountModel',
    schema: ShopsAccountSchema,
  },
]);

@Module({
  imports: [ShopsAccountTable, LogModule],
  controllers: [ShopsAccountController],
  providers: [ShopsAccountService],
})
export class ShopsAccountModule {}
