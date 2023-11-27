import { Document } from 'mongoose';

export interface MemberInterface extends Document {
  platform: string;
  cate: string;
}
