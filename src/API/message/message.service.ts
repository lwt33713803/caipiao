import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageInterfaces } from './interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('message')
    private readonly messageModule: Model<MessageInterfaces>,
  ) {}

  findMessageByMemberID(id: string) {
    return this.messageModule.find({ to: id });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  readMessage(id: string) {
    return this.messageModule.findOneAndUpdate({ _id: id }, { isRead: '1' });
  }
}
