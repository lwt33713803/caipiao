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
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  shop_name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  user_name: string;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: Math.floor(Date.now() / 1000),
  })
  crete_time: string;
}

export const MemberShopSchema = SchemaFactory.createForClass(MemberShop);
