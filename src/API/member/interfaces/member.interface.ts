import { Document } from 'mongoose';

export interface MemberInterface extends Document {
  name: string;
  phone: string;
  password: string;
  salt: string;
  avatar: string;
  isCert: boolean;
  isLogin: boolean;
  amount: number;
  todayAward: number;
  token: string;
  waitShow: number;
  waitAward: number;
  award: number;
  inviteCode: string;
  parents: any;
}
