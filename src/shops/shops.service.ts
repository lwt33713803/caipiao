import { Injectable } from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shops } from './schemas/shops.schema';
import { ShopsInterface } from './interfaces/shops.interface';
import { ShopsAccount } from 'src/shops_account/schemas/shops_account.schema';

@Injectable()
export class ShopsService {
  logger: any;
  constructor(
    @InjectModel('ShopsModel')
    private readonly ShopsModel: Model<Shops>,

    // 账户
    @InjectModel('ShopsAccountModel')
    private readonly ShopsAccountModel: Model<ShopsAccount>,
  ) {}

  create(shopsInterface: ShopsInterface) {
    console.log(shopsInterface);
  }

  myInfo(shop_id: string) {
    return this.ShopsModel.findOne({ shop_id }).exec();
  }

  update(shop_id: string, updateShopDto: UpdateShopDto) {
    return this.ShopsModel.updateOne({ shop_id }, { $set: updateShopDto });
  }

  findall() {
    return this.ShopsModel.find();
  }
  async recharge(id: string, num: number) {
    const data = await this.ShopsModel.findOne({ shop_id: id });
    await this.ShopsModel.updateOne(
      { shop_id: id },
      { $inc: { remaining_sum: num } },
    );
    const account_data = {
      shop_id: id,
      money: num + '',
      type: 1, // 0: 扣、1：充
      typeid: 0,
    };
    await this.ShopsAccountModel.create(account_data);

    return {
      result: data.remaining_sum + num,
    };
  }
}
