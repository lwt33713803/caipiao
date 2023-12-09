import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'feedback',
})
export class MemberFeedback extends Document {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
    default: 'type',
  })
  type: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  content: string;
}

export const MemberFeedbackSchema =
  SchemaFactory.createForClass(MemberFeedback);
