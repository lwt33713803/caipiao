import { Document } from 'mongoose';

export interface MemberShopInterface extends Document {
  member_id: string;
  shop_id: string;
  shop_name: string;
}
