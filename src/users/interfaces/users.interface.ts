import { Document } from 'mongoose';

export interface UsersInterface extends Document {
  name: string;
  password: string;
  token: string;
  avatar: string;
  state: string;
  shop_id: string;
  shop_name?: string;
  audit?: boolean;
}
