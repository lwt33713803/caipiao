import mongoose, { Document } from 'mongoose';
import { Prop, Schema as FSchema, SchemaFactory } from '@nestjs/mongoose';

@FSchema({
  collection: 'log',
})
export class Log extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  user: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  method: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  uri: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  ip: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  type: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  input: mongoose.Schema.Types.Mixed;

  @Prop({ type: mongoose.Schema.Types.String, default: Date.now() })
  create_at: string;

  @Prop({ type: mongoose.Schema.Types.String, default: Date.now() })
  update_at: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
