import { Document } from 'mongoose';

export interface MemberWalletOperationInterface extends Document {
  member: string;
  type: string;
  amouont: string;
  before: string;
  after: string;
  time: string;
}
