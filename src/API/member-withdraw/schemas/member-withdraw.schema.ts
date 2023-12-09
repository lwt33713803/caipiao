import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'withdraw',
})
export class MemberWithdraw extends Document {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  member: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  amount: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  state: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  create_time: string;
}

export const MemberWithdrawSchema =
  SchemaFactory.createForClass(MemberWithdraw);
