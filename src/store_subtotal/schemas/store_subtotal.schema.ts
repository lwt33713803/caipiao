import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'store_subtotal',
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
})
export class subtotalSchemas extends Document {
  @Prop({ type: mongoose.Schema.Types.String })
  store_name: string; //门店名字
  @Prop({ type: mongoose.Schema.Types.String })
  selled_sellers_count: string; //已开单销售数
  @Prop({ type: mongoose.Schema.Types.String })
  total_selled_amount: string; // 总销售
  @Prop({ type: mongoose.Schema.Types.String })
  open_counts: string; //总开户
  @Prop({ type: mongoose.Schema.Types.String })
  active_counts: string; //总激活
  @Prop({ type: mongoose.Schema.Types.String })
  seller_counts: string; //消费数量
}

export const SubtotalSchema = SchemaFactory.createForClass(subtotalSchemas);
