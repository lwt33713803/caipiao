import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'message',
})
export class Message extends Document {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: '系统消息',
  })
  title: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  from: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  to: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  content: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  creat_at: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  type: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  isRead: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
