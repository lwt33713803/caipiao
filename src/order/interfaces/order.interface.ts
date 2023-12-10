import { Document } from 'mongoose';

export interface OrderInterface extends Document {
  _id: string;
  deadline: string;
  order_time: string;
  status: number;
  pay_status: number;
  type: number;
  user_id: string;
  user_name: string;
  shop_id: string;
  money: number;
  createTime: string;
  updateTime: string;
  items: any;
  award_amount: number;
  oss_key?: string;
  service?: string;
  expect: number;
}
