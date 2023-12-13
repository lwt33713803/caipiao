import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'shops_account',
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
})
export class ShopsAccount extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  shop_id: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  money: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  type: number;

  // 订单彩种
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  order_type: number;

  // 操作类型 0 充值、1 派奖、2 手续费
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  typeid: number;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  order_id: string;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  user_id: string;

  @Prop({ type: mongoose.Schema.Types.Number, default: new Date() })
  create_time: Date;

  @Prop({ type: mongoose.Schema.Types.Number, default: new Date() })
  update_time: Date;
}

export const ShopsAccountSchema = SchemaFactory.createForClass(ShopsAccount);
