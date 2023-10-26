import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class Users extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  password: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  token: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  avatar: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  state: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  salt: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
