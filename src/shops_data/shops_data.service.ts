import { Injectable } from '@nestjs/common';
import { CreateShopsDatumDto } from './dto/create-shops_datum.dto';
import { UpdateShopsDatumDto } from './dto/update-shops_datum.dto';
import { Model } from 'mongoose';
import { OrderInterface } from 'src/order/interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Lottery } from 'src/lottery/schemas/lottery.schema';
import { MemberShopInterface } from 'src/API/member_shops/interfaces/member_shop.interface';
import { MemberWithdrawInterface } from 'src/API/member-withdraw/interfaces/member-withdraw.interface';
import { MemberChargeInterface } from 'src/API/member-charge/interfaces/member-charge.interface';
import { ShopsAccount } from 'src/shops_account/schemas/shops_account.schema';

@Injectable()
export class ShopsDataService {
  constructor(
    @InjectModel('OrderModel')
    private readonly orderModel: Model<OrderInterface>,
    @InjectModel('LotteryModel')
    private readonly LotteryModel: Model<Lottery>,
    @InjectModel('MemberShops')
    private readonly memberShopModel: Model<MemberShopInterface>,
    @InjectModel('withdraw')
    private readonly memberWithdraw: Model<MemberWithdrawInterface>,
    @InjectModel('charges')
    private readonly memberCharge: Model<MemberChargeInterface>,
    @InjectModel('ShopsAccountModel')
    private readonly ShopsAccountModel: Model<ShopsAccount>,
  ) {}

  async findData(shop_id: string, start_date: string, end_date: string) {
    const startTime = new Date(start_date);
    const endTime = new Date(end_date);
    const order = await this.orderModel
      .find({
        shop_id,
        status: 2,
        updateTime: {
          $gte: startTime,
          $lte: endTime,
        },
      })
      .exec();
    const lottery = await this.LotteryModel.find({
      shop_id,
      winning_status: 1,
      updatedAt: {
        $gte: startTime,
        $lte: endTime,
      },
    });
    const shops_account_deduction = await this.ShopsAccountModel.find({
      shop_id,
      type: 0,
      update_time: {
        $gte: startTime.getTime(),
        $lte: endTime.getTime(),
      },
    });
    const shops_account_charges = await this.ShopsAccountModel.find({
      shop_id,
      type: 1,
      update_time: {
        $gte: startTime.getTime(),
        $lte: endTime.getTime(),
      },
    });
    const id_arr = [];
    await (
      await this.memberShopModel.find({ shop_id })
    ).forEach((item) => {
      id_arr.push(item.member_id);
    });

    const member_query = {
      member: { $in: id_arr },
      create_time: {
        $gte: startTime.getTime(),
        $lte: endTime.getTime(),
      },
    };
    const withdraw = await this.memberWithdraw.find(member_query);
    const charges = await this.memberCharge.find(member_query);
    /*
     * drawBill_total 出单总计、service_total 手续费、award_total 派奖总计、withdraw_total 提现
     * charges 充值、shops_deduction 商家扣款
     */
    const drawBill_total = this.filterTotal(order, 'money');
    const service_total = drawBill_total * this.filterTotal(order, 'service');
    const award_total = this.filterTotal(lottery, 'winning');
    const withdraw_total = this.filterTotal(withdraw, 'amount');
    const charges_total = this.filterTotal(charges, 'amount');
    const shops_deduction = this.filterTotal(shops_account_deduction, 'money');
    const shops_charges = this.filterTotal(shops_account_charges, 'money');

    return {
      drawBill_total,
      service_total,
      award_total,
      withdraw_total,
      charges_total,
      shops_deduction,
      shops_charges,
      register_total: 0,
      buy_total: 0,
      cooperation_total: 0
    };
  }

  filterTotal(data, key) {
    return data.reduce((acc, cur) => acc + Number(cur[key]), 0);
  }
}
