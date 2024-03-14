import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'seller_subtotal',
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
})
export class SellerSubtotalTable extends Document {
  @Prop({ type: mongoose.Schema.Types.String })
  seller_name: string; //销售名字
  @Prop({ type: mongoose.Schema.Types.String })
  seller_store: string; //所属门店
  @Prop({ type: mongoose.Schema.Types.String })
  seller_group: string; //所属组别
  @Prop({ type: mongoose.Schema.Types.String })
  seller_total_amount: string; // 总销售金额
  @Prop({ type: mongoose.Schema.Types.String })
  seller_open_counts: string; //总开户
  @Prop({ type: mongoose.Schema.Types.String })
  seller_active_counts: string; //总激活
  @Prop({ type: mongoose.Schema.Types.String })
  seller_counts: string; //总消费数量
}

export const SellerSubtotalSchema =
  SchemaFactory.createForClass(SellerSubtotalTable);
