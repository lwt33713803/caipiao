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
import { MemberInterface } from 'src/API/member/interfaces/member.interface';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import axios from 'axios';

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

    // member
    @InjectModel('member') private readonly memberModel: Model<MemberInterface>,
  ) {}

  create(createLotteryDto: CreateLotteryDto) {
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

  // 每天21-22点 每5分钟执行一次
  @Cron('0 0/5 21,22 * * *')
  // @Cron('*/10 * * * * *')
  async querytQuintupleTask() {
    const checkData = await this.checkPl5();
    // openCode: 开奖号码、code: 彩种、expect: 期数、time：开奖时间按
    const { openCode, code, expect, time } = checkData.data;
    console.log(`checkData`, checkData);
    const data = await this.OrderModel.find({
      $and: [{ pay_status: 1, status: 2 }],
    }).exec();
    if (data.length > 0) {
      data.forEach(async (item: any) => {
        const { _doc } = item;
        const order_id = _doc._id.toString();
        const exists = await this.LotteryModel.findOne({ order_id });
        if (!exists) {
          // console.log('派单列表没有');
          // 记录中奖号
          let arr = [];
          let winning = 100000;
          _doc.items.forEach((_item) => {
            const { codes, amount } = _item;
            // 排列5 只有一个奖项
            if (codes === openCode) {
              arr.push({
                ..._item,
                prizes: '一等奖',
              });
              winning = winning * amount;
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
              winning,
              // 派奖类型: 0 店内派奖、1 合作订单、2 合作订单
              winning_type: 0,
              // 派奖状态：0 未派奖、1 已派奖
              winning_status: 0,
              // 中奖号
              target: openCode,
              // 期号、开奖时间
              expect,
              time,
            });
        }
      });
    }
    return;
    // this.logger.debug('查询每日排列五中奖');
  }

  // 派奖 Api
  async useItem(order_id: string, shop_id: string, user_id: string) {
    const lottery = await this.LotteryModel.findOne({ order_id }).exec();
    const user = await this.ShopsModel.findOne({ shop_id }).exec();
    const member = await this.memberModel.findOne({ _id: user_id }).exec();
    // 商家余额
    const { remaining_sum } = user;
    // 玩家余额
    const { amount } = member;
    const { items } = lottery;
    // 中奖金额
    const winning = Number(lottery.winning);
    if (remaining_sum > winning) {
      // 订单状态: winning_status 1 已派奖
      await this.LotteryModel.updateOne(
        { order_id },
        { $set: { winning_status: 1 } },
      );
      // 更新 个人信息表
      await this.ShopsModel.updateOne(
        { shop_id },
        { $set: { remaining_sum: remaining_sum - winning } },
      );
      // 更新 member (增加: 金额、中奖信息、订单号)
      await this.memberModel.updateOne(
        { _id: user_id },
        { $set: { amount: amount + winning, items, order_id } },
      );
      console.log('member', member);
      // 添加 账户明细-扣款信息
      const account_data = {
        shop_id,
        money: winning + '',
        type: 0, // 0: 扣、1：充
        order_type: lottery['type'],
        order_id: lottery['_id'].toString(),
        user_id: lottery['user_id'],
      };
      await this.ShopsAccountModel.create(account_data);
      return '派奖成功';
    }
    // 当前账户余额不支持扣款
    throw new ApiException('当前余额不足', ApiErrorCode.ROLE_EXIST);
  }

  async checkPl5() {
    const url = 'https://www.mxnzp.com/api/lottery/common/latest'; // 获取最新中奖号
    const params = {
      code: 'pl5',
      app_id: 'xplmkrsahrelshno',
      app_secret: '4xTljgXrlOwyjOFVKKGQrTltZwXa7jcW',
    };
    try {
      const response = await axios.get(url, { params });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // 处理错误
      throw new Error('Failed to fetch data from API.');
    }
  }
}
