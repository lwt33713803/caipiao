import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'follow',
})
export class Follow extends Document {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: '尚且未设置',
  })
  name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  phone: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
