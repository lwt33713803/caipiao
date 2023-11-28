import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'shops_data',
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
})
export class ShopsData extends Document {
  @Prop({ type: mongoose.Schema.Types.String })
  shop_id: string;
  // 总出票金额
  @Prop({ type: mongoose.Schema.Types.String })
  drawer_total: string;
  // 派奖总金额
  @Prop({ type: mongoose.Schema.Types.String })
  award_total: string;
  // 用户充值
  @Prop({ type: mongoose.Schema.Types.String })
  recharge: string;
  // 用户提现
  @Prop({ type: mongoose.Schema.Types.String })
  withdraw: string;
  // 合作收入
  @Prop({ type: mongoose.Schema.Types.String })
  cooperation: string;
  // 服务费支出
  @Prop({ type: mongoose.Schema.Types.String })
  service: string;
  // 手工价款
  @Prop({ type: mongoose.Schema.Types.String })
  add_money: string;
  // 手工扣款
  @Prop({ type: mongoose.Schema.Types.String })
  sub_money: string;
  // 注册用户
  @Prop({ type: mongoose.Schema.Types.String })
  register: string;
  // 购彩用户
  @Prop({ type: mongoose.Schema.Types.String })
  purchase: string;
  // 今日店铺余额
  @Prop({ type: mongoose.Schema.Types.String })
  today_shop_balance: string;
  // 昨日店铺余额
  @Prop({ type: mongoose.Schema.Types.String })
  yester_shop_balance: string;
  // 今天托管余额
  @Prop({ type: mongoose.Schema.Types.String })
  today_trust_balance: string;
  // 昨天托管余额
  @Prop({ type: mongoose.Schema.Types.String })
  yester_trust_balance: string;
  // 店铺余额波动
  @Prop({ type: mongoose.Schema.Types.String })
  shop_balance_roll: string;
  // 托管余额波动
  @Prop({ type: mongoose.Schema.Types.String })
  trust_balance_roll: string;
  // 创建时间
  @Prop({ type: mongoose.Schema.Types.Number, default: Date.now() })
  create_time: Date;
  // 更新时间
  @Prop({ type: mongoose.Schema.Types.Number, default: Date.now() })
  update_time: Date;
}

export const ShopsDataSchema = SchemaFactory.createForClass(ShopsData);
