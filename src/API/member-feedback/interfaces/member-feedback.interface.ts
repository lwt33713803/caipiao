import { Document } from 'mongoose';

export interface MemberFeedbackInterface extends Document {
  type: string; //发送方
  content: string; //接收方
}
