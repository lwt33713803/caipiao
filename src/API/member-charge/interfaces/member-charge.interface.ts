import { Document } from 'mongoose';

export interface MemberChargeInterface extends Document {
  order_id: string;
  state: string;
  amount: string;
  pay_method: string;
  create_time: string;
  update_time: string;
  member: string;
}
