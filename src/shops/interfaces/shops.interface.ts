import { Document } from 'mongoose';
import {
  CreateShopsUser,
  CreateShopsClerk,
  CreateShopsAlipay,
} from '../dto/create-shop.dto';

export interface ShopsInterface extends Document {
  _id: string;
  shop_id: string;
  remaining_sum: string;
  trust_sum: number;
  setting: {
    register_flag: boolean;
    home_poster: boolean;
    home_order_remind: boolean;
  };
  user_manage: CreateShopsUser[];
  clerk_manage: CreateShopsClerk[];
  receipt_manage: {
    alipay: CreateShopsAlipay[];
    code: any[]
  };
}
