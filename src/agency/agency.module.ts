import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgencySchema } from './schemas/shops_account.schema';

const AgencyTable = MongooseModule.forFeature([
  {
    name: 'AgencyModel',
    schema: AgencySchema,
  },
]);

@Module({
  imports: [AgencyTable],
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [AgencyService],
})
export class AgencyModule {}
