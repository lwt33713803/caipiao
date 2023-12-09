import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'lottery',
  timestamps: true,
})
export class Lottery extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  order_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  user_id: string;
  @Prop({ type: mongoose.Schema.Types.Number, default: new Date() })
  update_time: Date;
  @Prop({ type: mongoose.Schema.Types.Number, default: new Date() })
  created_time: Date;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  type: number;
  @Prop({ type: Array, required: false })
  items: any[];
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  order_time: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  money: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  winning: string;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  winning_type: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  winning_status: number;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  target: string;
  // 期号
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  expect: string;
  // 开奖时间
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  time: string;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery);
