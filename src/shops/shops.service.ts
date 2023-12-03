import { Injectable } from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shops } from './schemas/shops.schema';
import { ShopsInterface } from './interfaces/shops.interface';

@Injectable()
export class ShopsService {
  logger: any;
  constructor(
    @InjectModel('ShopsModel')
    private readonly ShopsModel: Model<Shops>,
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

  async recharge(id: string, num: number) {
    const data = await this.ShopsModel.findOne({ shop_id: id });
    await this.ShopsModel.updateOne(
      { shop_id: id },
      { $inc: { remaining_sum: num } },
    );
    return {
      result: data['remaining_sum'] + num,
    };
  }
}
