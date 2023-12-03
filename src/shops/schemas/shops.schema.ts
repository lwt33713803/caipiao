import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateShopsClerk } from '../dto/create-shop.dto';

@Schema({
  collection: 'shops',
  timestamps: {
    updatedAt: 'updateTime',
  },
})
export class Shops extends Document {
  @Prop({ type: mongoose.Schema.Types.String })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.Number })
  remaining_sum: number;
  @Prop({ type: mongoose.Schema.Types.Number })
  trust_sum: number;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  setting: object;
  @Prop({ type: mongoose.Schema.Types.Array })
  user_manage: [];
  @Prop({ type: mongoose.Schema.Types.Mixed })
  receipt_manage: object;

  @Prop({ type: mongoose.Schema.Types.Array })
  clerk_manage: [];

  @Prop({ type: mongoose.Schema.Types.Mixed, default: new Date() })
  updateTime: Date;
}

export const ShopsSchema = SchemaFactory.createForClass(Shops);
