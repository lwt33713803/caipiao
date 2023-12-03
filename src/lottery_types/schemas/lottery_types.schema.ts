import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'lottery_types',
  timestamps: {
    updatedAt: 'updateTime',
  },
})
export class LotteryTypes extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  shop_id: string;

  // 竞彩足球
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  competitive_football: object;

  // 竞彩篮球
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  competitive_basketball: object;

  // 胜负彩
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  victory_defeat: object;

  // 任选9
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  choice_nine: object;

  // 大乐透
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  super_lotto: object;

  // 排列3
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  arrange_three: object;

  // 排列5
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  arrange_five: object;

  // 七星彩
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  seven_color: object;

  // 4场进球
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  four_matches: object;

  // 6场进球
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  six_matches: object;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: new Date() })
  updateTime: Date;
}

export const LotteryTypesSchema = SchemaFactory.createForClass(LotteryTypes);
