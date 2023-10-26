import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'category',
})
export class Category extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true})
  name: string;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  desc: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
