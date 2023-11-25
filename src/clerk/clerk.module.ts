import { Module } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { ClerkController } from './clerk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClerkSchema } from './schemas/clerk.schema';
import { LogModule } from '../log/log.module';

const ClerkTable = MongooseModule.forFeature([
  {
    name: 'ClerkModel',
    schema: ClerkSchema,
  },
]);

@Module({
  imports: [ClerkTable, LogModule],
  controllers: [ClerkController],
  providers: [ClerkService],
})
export class ClerkModule {}
