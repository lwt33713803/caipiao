import { Injectable } from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ShopsInterface } from './interfaces/shops.interface';

@Injectable()
export class ShopsService {
  constructor(

    @InjectModel('ShopsModel')
    private readonly ShopsModel: Model<ShopsInterface>,

  ) {}

  findAll() {
    return `This action returns all shops`;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }

  myInfo(shop_id: string) {
    return this.ShopsModel.findOne({ shop_id }).exec();
  }
}
