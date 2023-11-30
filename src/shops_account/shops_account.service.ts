import { Injectable } from '@nestjs/common';
import { CreateShopsAccountDto } from './dto/create-shops_account.dto';
import { UpdateShopsAccountDto } from './dto/update-shops_account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ShopsAccount } from './schemas/shops_account.schema';

@Injectable()
export class ShopsAccountService {
  constructor(
    @InjectModel('ShopsAccountModel')
    private readonly ShopsAccountModel: Model<ShopsAccount>,
  ) {}

  create(createShopsAccountDto: CreateShopsAccountDto) {
    return 'This action adds a new shopsAccount';
  }

  async findAll(shop_id: string, type: number) {
    console.log('shop_id', shop_id);
    console.log('type', type);
    const arr = [{ shop_id }, { $and: [{ shop_id }, { type }] }];
    // 全部
    if (!type) return await this.ShopsAccountModel.find(arr[0]);
    // 根据 type 0: 支出、1：收入
    return await this.ShopsAccountModel.find(arr[1]);
  }

  findOne(id: number) {
    return `This action returns a #${id} shopsAccount`;
  }

  update(id: number, updateShopsAccountDto: UpdateShopsAccountDto) {
    return `This action updates a #${id} shopsAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopsAccount`;
  }
}
