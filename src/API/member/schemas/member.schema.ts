import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'member',
})
export class Member extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true})
  name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  desc: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
