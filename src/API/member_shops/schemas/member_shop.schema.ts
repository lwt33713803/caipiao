import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'member_shop',
})
export class MemberShop extends Document {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  member_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  shop_name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  user_name: string;
}

export const MemberShopSchema = SchemaFactory.createForClass(MemberShop);
