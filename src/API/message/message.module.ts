import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';

const TableMessage = MongooseModule.forFeature([
  {
    name: 'message',
    schema: MessageSchema,
  },
]);

@Module({
  imports: [TableMessage],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
