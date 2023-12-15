import { Document } from 'mongoose';

export interface MemberInterface extends Document {
  name: string;
  phone: string;
  password: string;
  payPassword: string;
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
  totalOrder: number; //总计投注金额
  certs: {
    cardID: string;
    cardName: string;
  };
  items?: any[];
  order_id?: string;
  third_accounts: {
    ali: string;
    wechart: string;
  };
  bank_info: {
    bank_name: string;
    bank_open: string;
    name: string;
    account: string;
  };
}
