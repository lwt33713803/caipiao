import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogSchema } from './schemas/log.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const LogList = MongooseModule.forFeature([
  {
    name: 'log',
    schema: LogSchema,
  },
]);

@Module({
  imports: [LogList],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
