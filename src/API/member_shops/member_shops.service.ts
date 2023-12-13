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
import { ShopCategiriesDto } from './dto/shop-categories.dto';
import { LotteryTypesService } from 'src/lottery_types/lottery_types.service';

@Injectable()
export class MemberShopsService {
  constructor(
    @InjectModel('MemberShops')
    private readonly memberShopModel: Model<MemberShopInterface>,
    private readonly memberService: MemberService,
    private readonly shopsService: ShopsService,
    private readonly lotteryTypes: LotteryTypesService,
  ) {}

  async findAll(shop_id: string) {
    return await this.memberShopModel.find({ shop_id }).exec();
  }

  async bind(createMemberShopDto: CreateMemberShopDto) {
    const member = await this.memberService.info(createMemberShopDto.token);
    if (!member) {
      throw new ApiException(
        '获取失败，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const shop = await this.shopsService.myInfo(createMemberShopDto.shop_id);
    if (!shop) {
      throw new ApiException(
        '店铺查询失败，请重新扫描',
        ApiErrorCode.FORBIDDEN,
      );
    }

    //判断是不佛海已经绑定
    const my_shop = await this.findAll(createMemberShopDto.shop_id);
    console.log(my_shop);
    if (my_shop.length > 0) {
      throw new ApiException('店铺已经绑定', ApiErrorCode.FORBIDDEN);
    }
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

  async categories(shopCategiriesDto: ShopCategiriesDto) {
    const member = await this.memberService.info(shopCategiriesDto.token);
    if (!member) {
      throw new ApiException(
        '获取失败，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const categories = this.lotteryTypes.findOne(shopCategiriesDto.shop_id);
    return categories;
  }

  async detail(detailMemberShopDto: DetailMemberShopDto) {
    const shop = await this.shopsService.myInfo(detailMemberShopDto.shop_id);
    if (!shop) {
      throw new ApiException('店铺查询失败，请刷新', ApiErrorCode.FORBIDDEN);
    }
    return shop;
  }
}
