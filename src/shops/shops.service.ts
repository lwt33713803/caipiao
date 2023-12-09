import { Injectable } from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shops } from './schemas/shops.schema';

@Injectable()
export class ShopsService {
  logger: any;
  constructor(
    @InjectModel('ShopsModel')
    private readonly ShopsModel: Model<Shops>,
  ) {}

  myInfo(shop_id: string) {
    return this.ShopsModel.findOne({ shop_id }).exec();
  }

  update(shop_id: string, updateShopDto: UpdateShopDto) {
    return this.ShopsModel.updateOne({ shop_id }, { $set: updateShopDto });
  }

  findall() {
    return this.ShopsModel.find();
  }
}
