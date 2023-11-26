import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { AcceptDto, UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { OrderInterface } from './interfaces/order.interface';
import { OrderSchema } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('OrderModel')
    private readonly orderModel: Model<OrderInterface>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll(): Promise<any[]> {
    const temp = await this.orderModel.find().exec();
    return temp;
  }

  async find(shop_id: string, status: string, type: string, sort: string) {
    const arr = [
      { $and: [{ shop_id, status }] },
      { $and: [{ shop_id, status }, { type }] },
    ];
    const sort_arr = [{ deadline: 1 }, { order_time: 1 }, { money: 1 }];
    let query = type === '0' ? arr[0] : arr[1];
    return await this.orderModel.find(query).sort(sort_arr[sort]).exec();
  }

  // 接单
  async acceptOrder(acceptDto: AcceptDto) {
    const { _id } = acceptDto;
    return await this.orderModel.findOneAndUpdate({ _id }, { status: 1 });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  orderList(queryOrderDto: QueryOrderDto) {
    console.log(`QueryOrderDto`, queryOrderDto);
    const { timeType, categoryType, type } = queryOrderDto;
    //timeType: 0 截至时间、1 下单时间、2 下单排序
    //categoryType: 0 全部、1 竞彩足球、2 竞彩篮球、3 胜负彩、4 任选九、5 大乐透、6 排列三、7 排列五、8 七星彩、9 4场全进 、10 6场全进
    //type：0 未结单、1 未出票
  }
}
