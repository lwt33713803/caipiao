import { Document } from 'mongoose';

export interface MemberWithdrawInterface extends Document {
  member: string;
  amount: string;
  state: string;
  account: string;
  create_time: string;
}
