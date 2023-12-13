import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'agency',
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
})
export class Agency extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  shop_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  member_id: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  user_name: string;
  @Prop({ type: mongoose.Schema.Types.Date, default: new Date() })
  create_time: Date;
  @Prop({ type: mongoose.Schema.Types.Boolean, required: false, default: true })
  open_swithc: boolean;
  @Prop({ type: mongoose.Schema.Types.String, required: false, default: '' })
  mins: String;
  @Prop({ type: mongoose.Schema.Types.String, required: false, default: '' })
  total: String;
  @Prop({ type: mongoose.Schema.Types.String, required: false, default: '' })
  ratio: String;
  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: false,
    default: new Array(),
  })
  subordinate: [];
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
