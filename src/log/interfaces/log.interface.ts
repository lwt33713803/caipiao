import { Document } from 'mongoose';

export enum loginTypeEnum {
  'token' = 'login success get token',
  'req' = 'req',
  'error' = 'error',
}
export interface LogInterface extends Document {
  user: string;
  method: string;
  uri: string;
  ip: string;
  type: loginTypeEnum;
  input: any;
  create_at: string;
  update_at: string;
}
