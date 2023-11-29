import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcceptDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { OrderInterface } from './interfaces/order.interface';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { MemberService } from 'src/API/member/member.service';
import { ApiCreateOrderDto } from 'src/order/dto/api-create-order.dto';
import { map } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('OrderModel')
    private readonly orderModel: Model<OrderInterface>,
    @Inject(MemberService)
    private readonly memberService: MemberService,
  ) {}

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
    const query = type === '0' ? arr[0] : arr[1];
    return await this.orderModel.find(query).sort(sort_arr[sort]).exec();
  }

  // 接单
  async acceptOrder(acceptDto: AcceptDto) {
    const { _id } = acceptDto;
    return await this.orderModel.findOneAndUpdate({ _id }, { status: 1 });
  }

  orderList(queryOrderDto: QueryOrderDto) {
    console.log(`QueryOrderDto`, queryOrderDto);
    // const { timeType, categoryType, type } = queryOrderDto;
    //timeType: 0 截至时间、1 下单时间、2 下单排序
    //categoryType: 0 全部、1 竞彩足球、2 竞彩篮球、3 胜负彩、4 任选九、5 大乐透、6 排列三、7 排列五、8 七星彩、9 4场全进 、10 6场全进
    //type：0 未结单、1 未出票
  }

  //根据token获取订单
  async getOrderByToken(token: string, status: string) {
    const member = await this.memberService.info(token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const sta = JSON.parse(status);
    // console.log({ user_id: member._id, ...sta });
    return this.orderModel.find({ user_id: member._id, ...sta });
  }

  //下单
  async createOrder(apiCreateOrderDto: ApiCreateOrderDto) {
    const member = await this.memberService.info(apiCreateOrderDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    let total = 0;
    //计算彩票金额
    apiCreateOrderDto.items.map(function (item) {
      item['total'] = item['amount'] * item['counts'];
      total += item['total'];
    });

    this.orderModel.create({
      deadline: Date.parse(new Date().toString()),
      order_time: Date.parse(new Date().toString()),
      money: total,
      type: apiCreateOrderDto.type,
      status: 0,
      pay_status: 0,
      user_id: member._id,
      items: apiCreateOrderDto.items,
    });
  }
}
