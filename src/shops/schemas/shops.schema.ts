import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'shops',
  timestamps: true,
})
export class Shops extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  _id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  deadline: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  order_time: string;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  status: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  type: number;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  user_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  user_name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  money: string;
}

export const ShopsSchema = SchemaFactory.createForClass(Shops);
