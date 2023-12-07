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
    const result = '6,3,2,8,0';
    const data = await this.OrderModel.find({
      $and: [{ pay_status: 1, status: 2 }],
    }).exec();
    console.log(data);
    if (data.length > 0) {
      data.forEach(async (item: any) => {
        const { _doc } = item;
        const order_id = _doc._id.toString();
        const exists = await this.LotteryModel.findOne({ order_id });
        if (!exists) {
          // console.log('派单列表没有');
          // 记录中奖号
          let arr = [];
          _doc.items.forEach((_item) => {
            const { codes } = _item;
            const prizes = this.countCommonElements(
              result.split(','),
              codes.split(','),
            );
            if (prizes !== '谢谢惠顾') {
              arr.push({
                ..._item,
                prizes,
              });
            }
          });

          if (arr.length > 0)
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
              // 中奖号
              target: result
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
    console.log(order.items);

    // if (order) {

    //   const total = user.remaining_sum;
    //   const winning = Number(order.winning);
    //   // 店铺余额 - 中奖金额
    //   let result: number = total - winning;
    //   if (result < 0) {
    //     // 当前账户余额不支持扣款
    //   }
    //   // 订单状态: winning_status 1 已派奖
    //   await this.LotteryModel.updateOne(
    //     { order_id: id },
    //     { $set: { winning_status: 1 } },
    //   );
    //   // 更新 个人信息表
    //   await this.ShopsModel.updateOne(
    //     { shop_id },
    //     { $set: { remaining_sum: result } },
    //   );

    //   // 添加 账户明细-扣款信息
    //   const account_data = {
    //     shop_id,
    //     money: winning + '',
    //     type: 0, // 0: 扣、1：充
    //     order_type: order['type'],
    //     order_id: order['_id'].toString(),
    //     user_id: order['user_id'],
    //   };
    //   await this.ShopsAccountModel.create(account_data);
    //   return;
    // }
    // return `无法匹配到 id=${id}或shop_id=${shop_id} 的数据。`;
  }

  async rankFive(data) {}

  // 排列5 中奖数据过滤
  countCommonElements(arr1, arr2) {
    let commonCount = 0; // 记录共有元素的个数
    const equality = this.checkIndexEquality(arr1, arr2);
    const prizesArr = [
      '一等奖',
      '二等奖',
      '三等奖',
      '四等奖',
      '五等奖',
      '谢谢惠顾',
    ];
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        commonCount++;
      }
    }
    if (commonCount === 5) {
      return prizesArr[0];
    }
    if (commonCount === 4 && equality) {
      return prizesArr[1];
    }
    if (commonCount === 3 && equality) {
      return prizesArr[2];
    }
    if (commonCount === 2 && equality) {
      return prizesArr[3];
    }
    if (commonCount === 1 && equality) {
      return prizesArr[4];
    }
    return prizesArr[5];
  }
  // 排列5 检查两个数组下标是否相同
  checkIndexEquality(arr1, arr2) {
    if (arr1.length !== arr2.length) return false; // 如果长度不同则返回false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) return true; // 如果对应位置上的值不相等则返回false
    }
    return false;
  }
}
