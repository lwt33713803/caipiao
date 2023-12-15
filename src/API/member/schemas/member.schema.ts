import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'member',
})
export class Member extends Document {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: '尚且未设置',
  })
  name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  phone: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  payPassword: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  salt: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  avatar: string;
  @Prop({
    type: mongoose.Schema.Types.Boolean,
    required: false,
    default: false,
  })
  isCert: boolean;
  @Prop({
    type: mongoose.Schema.Types.Boolean,
    required: false,
    default: false,
  })
  isLogin: boolean;
  @Prop({ type: mongoose.Schema.Types.Number, required: false, default: 0 })
  amount: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false, default: 0 })
  todayAward: number;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  token: string;
  @Prop({ type: mongoose.Schema.Types.Number, required: false, default: 0 })
  waitShow: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false, default: 0 })
  waitAward: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false, default: 0 })
  award: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false, default: 0 })
  totalOrder: number;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  inviteCode: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  parents: string;
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  certs: {
    cardID: string;
    cardName: string;
  };

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  items: any;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  order_id: string;
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  third_accounts: any;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  bank_info: any;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: Math.floor(Date.now() / 1000),
  })
  create_at: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
