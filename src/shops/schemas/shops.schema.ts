import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateShopsClerk } from '../dto/create-shop.dto';

@Schema({
  collection: 'shops',
  timestamps: true,
})
export class Shops extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;
  @Prop({ type: mongoose.Schema.Types.String })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.String })
  remaining_sum: string;
  @Prop({ type: mongoose.Schema.Types.String })
  trust_sum: string;
  @Prop({ type: Object })
  setting: Object;
  @Prop({ type: mongoose.Schema.Types.Array })
  user_manage: any[];
  @Prop({ type: mongoose.Schema.Types.Array })
  receipt_manage: any[];
  
  @Prop({ type: Array })
  clerk_manage: CreateShopsClerk[];
}

export const ShopsSchema = SchemaFactory.createForClass(Shops);
