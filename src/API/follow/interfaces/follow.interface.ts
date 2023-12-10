import { Document } from 'mongoose';

export interface FollowInterface extends Document {
  name: string;
  phone: string;
  password: string;
}
