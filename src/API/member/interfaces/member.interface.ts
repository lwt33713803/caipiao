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
  waitShow: number; //待出票
  waitAward: number; //待开奖
  award: number; //已开奖
  inviteCode: string;
  parents: any;
  items?: any[];
  order_id?: string; 
}
