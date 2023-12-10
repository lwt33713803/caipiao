import { Document } from 'mongoose';

export interface MemberWithdrawInterface extends Document {
  member: string;
  amount: string;
  state: string;
  create_time: string;
}
