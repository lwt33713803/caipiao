import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'member_operations',
})
export class MemberWalletOperation extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  member: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  type: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  amouont: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  before: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  after: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  time: string;
}

export const MemberWalletOperationSchema = SchemaFactory.createForClass(
  MemberWalletOperation,
);
