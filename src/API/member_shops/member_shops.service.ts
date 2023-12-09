import { Injectable } from '@nestjs/common';
import { CreateMemberShopDto } from './dto/create-member_shop.dto';
import { UpdateMemberShopDto } from './dto/update-member_shop.dto';

@Injectable()
export class MemberShopsService {
  create(createMemberShopDto: CreateMemberShopDto) {
    return 'This action adds a new memberShop';
  }

  findAll() {
    return `This action returns all memberShops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberShop`;
  }

  update(id: number, updateMemberShopDto: UpdateMemberShopDto) {
    return `This action updates a #${id} memberShop`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberShop`;
  }
}
