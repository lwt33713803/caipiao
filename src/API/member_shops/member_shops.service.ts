import { Injectable } from '@nestjs/common';
import { CreateMemberShopDto } from './dto/create-member_shop.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberService } from '../member/member.service';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filters/api.exception';
import { ShopsService } from '../../shops/shops.service';
import { MemberShopInterface } from './interfaces/member_shop.interface';
import { ListMemberShopDto } from './dto/list-member_shop.dto';
import { DetailMemberShopDto } from './dto/detail-member_shop.dto';

@Injectable()
export class MemberShopsService {
  constructor(
    @InjectModel('MemberShops')
    private readonly memberShopModel: Model<MemberShopInterface>,
    private readonly memberService: MemberService,
    private readonly shopsService: ShopsService,
  ) {}

  async bind(createMemberShopDto: CreateMemberShopDto) {
    const member = await this.memberService.info(createMemberShopDto.token);
    if (!member) {
      throw new ApiException(
        '获取失败，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const shop_id = createMemberShopDto.shop_id.split('=');
    const shop = await this.shopsService.myInfo(shop_id[1]);
    if (!shop) {
      throw new ApiException(
        '店铺查询失败，请重新扫描',
        ApiErrorCode.FORBIDDEN,
      );
    }
    console.log(shop);

    return this.memberShopModel.create({
      shop_id: createMemberShopDto.shop_id,
      shop_name: shop['shop_name'],
      member_id: member._id,
      user_name: member.name,
    });
  }

  async lists(listMemberShopDto: ListMemberShopDto) {
    const member = await this.memberService.info(listMemberShopDto.token);
    if (!member) {
      throw new ApiException(
        '获取失败，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    return this.memberShopModel.find({
      member_id: member._id,
    });
  }

  async detail(detailMemberShopDto: DetailMemberShopDto) {
    const shop = await this.shopsService.myInfo(detailMemberShopDto.shop_id);
    if (!shop) {
      throw new ApiException('店铺查询失败，请刷新', ApiErrorCode.FORBIDDEN);
    }
    return shop;
  }
}
