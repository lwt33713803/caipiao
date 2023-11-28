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
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  salt: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  avatar: string;
  @Prop({ type: mongoose.Schema.Types.Boolean, required: false })
  isCert: boolean;
  @Prop({ type: mongoose.Schema.Types.Boolean, required: false })
  isLogin: boolean;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  amount: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  todayAward: number;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  token: string;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  waitShow: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  waitAward: number;
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  award: number;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  inviteCode: string;
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  parents: any;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
