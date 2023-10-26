import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'products',
})
export class Product extends Document {
  @Prop({ type: mongoose.Schema.Types.String, required: true, maxlength: 30 })
  platform: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true, maxlength: 30 })
  cate: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true, maxlength: 30 })
  logo: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true, maxlength: 30 })
  no: string;
  @Prop({ type: mongoose.Schema.Types.String, required: true, maxlength: 30 })
  name: string;
  @Prop({ type: mongoose.Schema.Types.Array, required: true })
  skus: [];
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  price: number;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  unit: string;
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  min_buy: number;
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  stock: number | boolean;
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  month_sale_count: number;
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  desc: string;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ['正常销售', '已下架'],
  })
  state: string;
  @Prop({ type: mongoose.Schema.Types.Array, required: true })
  tasks: [
    task_name: {
      type: mongoose.Schema.Types.String;
    },
    task_price: {
      type: mongoose.Schema.Types.Number;
    },
    task_percent: {
      type: mongoose.Schema.Types.Number;
    },
    task_info: {
      type: mongoose.Schema.Types.String;
    },
    task_sku: {
      type: mongoose.Schema.Types.String;
    },
    steps: [],
  ];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
