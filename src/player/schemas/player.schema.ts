import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'player',
  timestamps: true,
})
export class Player extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String })
  shop_id: string;

  @Prop({ type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.String })
  avatar: string;

  @Prop({ type: mongoose.Schema.Types.Boolean })
  star: Boolean;

  @Prop({ type: mongoose.Schema.Types.Boolean })
  audit: Boolean;

  @Prop({ type: mongoose.Schema.Types.String, default: Date.now() })
  createTime: string;

  @Prop({ type: mongoose.Schema.Types.String, default: Date.now() })
  updateTime: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
