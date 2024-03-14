import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'groups_subtotal', //组别管理
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
})
export class GroupSubtotaTable extends Document {
  @Prop({ type: mongoose.Schema.Types.String })
  group_name: string; //组别名字
  @Prop({ type: mongoose.Schema.Types.String })
  group_state: string; //组别状态
}

export const GroupSubtotalSchema =
  SchemaFactory.createForClass(GroupSubtotaTable);
