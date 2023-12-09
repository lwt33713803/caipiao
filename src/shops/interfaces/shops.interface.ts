import { Document } from 'mongoose';
import {
  CreateShopsUser,
  CreateShopsClerk,
  CreateShopsAlipay,
} from '../dto/create-shop.dto';

export interface ShopsInterface extends Document {
  _id: string;
  shop_id: string;
  remaining_sum: number;
  trust_sum: number;
  setting: {
    register_flag: boolean;
    home_poster: boolean;
    home_order_remind: boolean;
  };
  user_manage: [];
  clerk_manage: [];
  receipt_manage: {
    alipay: [];
    code: []
  };

  shop_name?: string;
  shop_master?: string;
  shop_phone?: string;
  shop_address?: string;
  shop_notice?: string;
}
