import { Injectable } from '@nestjs/common';
import { CreateLotteryTypeDto } from './dto/create-lottery_type.dto';
import { UpdateLotteryTypeDto } from './dto/update-lottery_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LotteryTypes } from './schemas/lottery_types.schema';

@Injectable()
export class LotteryTypesService {
  constructor(
    @InjectModel('LotteryTypesModel')
    private readonly LotteryTypesModel: Model<LotteryTypes>,
  ) {}

  create(createLotteryTypeDto: CreateLotteryTypeDto) {
    console.log(createLotteryTypeDto)
    return 'This action adds a new lotteryType';
  }

  findAll() {
    return `This action returns all lotteryTypes`;
  }

  async findOne(shop_id: string) {
    return await this.LotteryTypesModel.findOne({ shop_id });
  }

  async upLottery(id: string, updateLotteryTypeDto: UpdateLotteryTypeDto) {
    const { type } = updateLotteryTypeDto;
    const arr = [
      'competitive_football',
      'competitive_basketball',
      'victory_defeat',
      'choice_nine',
      'super_lotto',
      'arrange_three',
      'arrange_five',
      'seven_color',
      'four_matches',
      'six_matches',
    ];
    const key = arr[type - 1];
    let query = {};
    query[key] = updateLotteryTypeDto;
    console.log(query);
    return await this.LotteryTypesModel.updateOne(
      { _id: id },
      { $set: query },
      { new: true },
    );
  }

  update(id: number, updateLotteryTypeDto: UpdateLotteryTypeDto) {
    return `This action updates a #${id} lotteryType`;
  }

  remove(id: number) {
    return `This action removes a #${id} lotteryType`;
  }
}
