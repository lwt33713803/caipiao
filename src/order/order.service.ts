import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcceptDto } from './dto/update-order.dto';
import { OrderInterface } from './interfaces/order.interface';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { MemberService } from 'src/API/member/member.service';
import { ApiCreateOrderDto } from 'src/order/dto/api-create-order.dto';
import { MemberWalletOperationsService } from 'src/API/member_wallet_operations/member_wallet_operations.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel('OrderModel')
    private readonly orderModel: Model<OrderInterface>,
    @Inject(MemberService)
    private readonly memberService: MemberService,
    @Inject(MemberWalletOperationsService)
    private readonly memberWalletOperationsService: MemberWalletOperationsService,
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
  async accept(acceptDto: AcceptDto) {
    const { _id } = acceptDto;
    return await this.orderModel.findOneAndUpdate({ _id }, { status: 1 });
  }

  // 出票
  async drawer(acceptDto: AcceptDto) {
    const { _id } = acceptDto;
    // 上传图片为完善
    return await this.orderModel.findOneAndUpdate(
      { _id },
      { status: 2, img_url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' },
    );
  }

  async queryDrawer(shop_id: string, status: number) {
    const query = { $and: [{ shop_id, status }] };
    return await this.orderModel.find(query).sort({ order_time: -1 }).exec();
  }

  async orderDesc(shop_id: string, id: string) {
    const query = { $and: [{ shop_id, _id: id }] };
    return await this.orderModel.findOne(query).exec();
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
    return this.orderModel
      .find({ user_id: member._id, ...sta })
      .sort({ createdAt: -1 })
      .exec();
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
      award_amount: 0,
    });
  }

  async payByBalance(order_id: string) {
    return order_id;
  }

  async queryOrderById(order_id: string) {
    return this.orderModel.findById(order_id);
  }


  setOrderPayed(order_id: string) {
    this.orderModel.findOneAndUpdate({ _id: order_id }, { pay_status: 1 });
  }
}
