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
import { ShopsAccount } from 'src/shops_account/schemas/shops_account.schema';
import { Shops } from 'src/shops/schemas/shops.schema';
import { Lottery } from 'src/lottery/schemas/lottery.schema';

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

    @InjectModel('ShopsAccountModel')
    private readonly ShopsAccountModel: Model<ShopsAccount>,

    @InjectModel('ShopsModel')
    private readonly ShopsModel: Model<Shops>,
    @InjectModel('LotteryModel')
    private readonly LotteryModel: Model<Lottery>,
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
    console.log('_id', _id);
    return await this.orderModel.findOneAndUpdate(
      { _id },
      // service：手续费 暂时写死
      { status: 1, service: '0.2' },
    );
  }

  // 出票
  async drawer(acceptDto: AcceptDto) {
    const { _id, shop_id } = acceptDto;
    // 出票扣减手续费
    const shops = await this.ShopsModel.findOne({ shop_id });
    const order = await this.orderModel.findOne({ _id });
    const { service, money, type, user_id } = order;
    const { remaining_sum } = shops;
    // 单笔手续费
    const abatement = Number(money) * Number(service);
    await this.ShopsModel.findOneAndUpdate(
      { shop_id },
      { remaining_sum: remaining_sum - abatement },
    );

    await this.orderModel.findOneAndUpdate(
      { _id },
      { status: 2, img_url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' },
    );
    const account_data = {
      shop_id,
      money: abatement + '',
      type: 0, // 0: 扣、1：充
      order_type: type,
      order_id: _id.toString(),
      user_id,
    };
    console.log(`account_data`, account_data);
    await this.ShopsAccountModel.create(account_data);
    return '出票成功';

    // 上传图片未完善
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
      shop_id: '656c3cec388c800f22e0652b',
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

  async myInfo(shop_id: string, status: string) {
    if (status === '1') {
      // console.log('接单')
      return await this.orderModel
        .find({ shop_id, status })
        .sort({ createdAt: -1 })
        .exec();
    } else if (status === '3') {
      // console.log('中奖')
      return await this.LotteryModel.find({ shop_id })
        .sort({ createdAt: -1 })
        .exec();
    }
  }
}
