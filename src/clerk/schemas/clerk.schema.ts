import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'clerk',
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class Clerk extends Document {
  @Prop({ type: mongoose.Schema.Types.String })
  shop_id: string;

  @Prop({ type: mongoose.Schema.Types.String })
  clerk_name: string;

  @Prop({ type: mongoose.Schema.Types.String })
  clerk_phone: string;

  @Prop({ type: mongoose.Schema.Types.String })
  clerk_password: string;

  @Prop({ type: mongoose.Schema.Types.String, default: Date.now() })
  createTime: string;

  @Prop({ type: mongoose.Schema.Types.String, default: Date.now() })
  updateTime: string;
}

export const ClerkSchema = SchemaFactory.createForClass(Clerk);
