import { Document } from 'mongoose';

export interface ClerkInterface extends Document {
  Shop_id: string;
  clerk_id?: string;
  clerk_name: string;
  clerk_phone: string;
  clerk_password: string;
}
