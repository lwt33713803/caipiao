import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './schemas/player.schema';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('PlayerModel')
    private readonly PlayerModel: Model<Player>,
  ) {}

  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  async findSearch() {
    
  }

  async findNum(shop_id: string) {
    let keys = {
      star: { star: { $eq: true } }, // 星标
      audit: { audit: { $eq: true } }, // 审核
      order: { is_order: { $eq: true } }, // 下单
    };
    const all_length = (await this.PlayerModel.find({ shop_id })).length;
    if (all_length > 0) {
      return {
        all_length,
        star_length: (await this.PlayerModel.find({ shop_id, ...keys.star })).length,
        audit_length: (await this.PlayerModel.find({ shop_id, ...keys.audit })).length,
        order_length: (await this.PlayerModel.find({ shop_id, ...keys.order })).length
      }
    }else {
      return {
        all_length: 0,
        star_length: 0,
        audit_length: 0,
        order_length: 0
      }
    }
  }

  async findAll(shop_id: string, type: string): Promise<Player[]> {
    let keys = {
      star: { star: { $eq: true } }, // 星标
      audit: { audit: { $eq: true } }, // 审核
      order: { is_order: { $eq: true } }, // 下单
    };
    if (type === 'all') return await this.PlayerModel.find({ shop_id }).exec();
    return await this.PlayerModel.find({ shop_id, ...keys[type] }).exec();
  }


  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
