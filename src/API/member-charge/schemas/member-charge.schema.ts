import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'charges',
})
export class MemberCharge extends Document {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: '',
  })
  state: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  order_id: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: 0,
  })
  amount: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  pay_method: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  create_time: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  update_time: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  member: string;
}

export const MemberChargeSchema = SchemaFactory.createForClass(MemberCharge);
