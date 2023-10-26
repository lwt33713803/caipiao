import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  platform: string;
  cate: string;
  logo: string;
  no: string;
  name: number;
  skus: string;
  price: number;
  unit: string;
  min_buy: number;
  stock: number | boolean;
  month_sale_count: number;
  desc: string;
  state: string;
  tasks: [
    {
      task_name: string;
      task_price: string;
      task_percent: number;
      task_info: string;
      task_sku: string;
      steps: [];
    },
  ];
}
