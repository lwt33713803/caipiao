import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'order',
  timestamps: {
    updatedAt: 'updateTime',
  },
})
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  deadline: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  order_time: string;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  status: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  type: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  pay_status: number;
   // 下单用户ID
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  user_id: string;
  // 下单用户名
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  user_name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  money: string;
  @Prop({ type: mongoose.Schema.Types.String })
  createTime: string;
  @Prop({ type: mongoose.Schema.Types.String, default: Date.now() })
  updateTime: string;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  items: any;
  @Prop({ type: mongoose.Schema.Types.Number })
  award_amount: number;
  // oss
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  oss_key: string;
  // 手续费
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  service: string;
  // 订单类型 0: 单买、1：跟单
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  order_type: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
