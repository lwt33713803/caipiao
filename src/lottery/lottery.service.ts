import { Injectable } from '@nestjs/common';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Lottery } from './schemas/lottery.schema';
import { Order } from '../order/schemas/order.schema';
import { Shops } from '../shops/schemas/shops.schema';
import { Cron } from '@nestjs/schedule';
import { ShopsAccount } from '../shops_account/schemas/shops_account.schema';

@Injectable()
export class LotteryService {
  constructor(
    @InjectModel('LotteryModel')
    private readonly LotteryModel: Model<Lottery>,

    // 首页订单
    @InjectModel('OrderModel')
    private readonly OrderModel: Model<Order>,

    // 个人中心
    @InjectModel('ShopsModel')
    private readonly ShopsModel: Model<Shops>,

    // 账户
    @InjectModel('ShopsAccountModel')
    private readonly ShopsAccountModel: Model<ShopsAccount>,
  ) {}

  create(createLotteryDto: CreateLotteryDto) {
    console.log(`createLotteryDto`, createLotteryDto);
    return 'This action adds a new lottery';
  }

  async findAll(shop_id: string, type: number) {
    return await this.LotteryModel.find({ shop_id, winning_type: type }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} lottery`;
  }

  update(id: number, updateLotteryDto: UpdateLotteryDto) {
    return `This action updates a #${id} lottery`;
  }

  remove(id: number) {
    return `This action removes a #${id} lottery`;
  }

  @Cron('1 0 19 * * *')
  // @Cron('*/10 * * * * *')
  async querytQuintupleTask() {
    const result = '1,2,3,4,5';
    const data = await this.OrderModel.find({
      $and: [{ pay_status: 1, status: 1, 'items.codes': { $regex: result } }],
    }).exec();

    if (data.length > 0) {
      data.forEach(async (item: any) => {
        const { _doc } = item;
        const order_id = _doc._id.toString();
        const exists = await this.LotteryModel.findOne({ order_id });
        if (!exists) {
          // console.log('派单列表没有');
          let arr = [];
          // 记录中奖号
          _doc.items.forEach((cc) => {
            if (cc.codes === result) {
              arr.push(cc);
            }
          });
          return await this.LotteryModel.create({
            _id: _doc._id,
            order_id: _doc._id.toString(),
            user_id: _doc.user_id,
            type: _doc.type,
            money: _doc.money,
            order_time: _doc.order_time,
            items: arr,
            shop_id: _doc.shop_id,

            // 暂时处理_中奖金额
            winning: _doc.money * 2,
            // 派奖类型: 0 店内派奖、1 合作订单、2 合作订单
            winning_type: 0,
            // 派奖状态：0 未派奖、1 已派奖
            winning_status: 0,
          });
        }
      });
    }
    return;
    // this.logger.debug('查询每日排列五中奖');
  }

  // 派奖 Api
  async useItem(id: string, shop_id: string) {
    const order = await this.LotteryModel.findOne({ order_id: id }).exec();
    const user = await this.ShopsModel.findOne({ shop_id }).exec();
    if (order) {
      const total = Number(user.remaining_sum);
      const winning = Number(order.winning);
      // 店铺余额 - 中奖金额
      let result: number = total - winning;
      if (result < 0) {
        // 当前账户余额不支持扣款
        
      }
        // 订单状态: winning_status 1 已派奖
        await this.LotteryModel.updateOne(
          { order_id: id },
          { $set: { winning_status: 1 } },
        );
      // 更新 个人信息表
      await this.ShopsModel.updateOne(
        { shop_id },
        { $set: { remaining_sum: result.toString() } },
      );

      // 添加 账户明细-扣款信息
      const account_data = {
        shop_id,
        money: winning + '',
        type: 0, // 0: 扣、1：充
        order_type: order['type'],
        order_id: order['_id'].toString(),
        user_id: order['user_id'],
      };
      console.log(account_data);
      await this.ShopsAccountModel.create(account_data);
      return;
    }
    return `无法匹配到 id=${id}或shop_id=${shop_id} 的数据。`;
  }
}
