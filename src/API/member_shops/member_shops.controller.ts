import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MemberShopsService } from './member_shops.service';
import { CreateMemberShopDto } from './dto/create-member_shop.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListMemberShopDto } from './dto/list-member_shop.dto';
import { DetailMemberShopDto } from './dto/detail-member_shop.dto';
import { ShopCategiriesDto } from './dto/shop-categories.dto';

@ApiTags('商铺绑定')
@Controller('member-shops')
export class MemberShopsController {
  constructor(private readonly memberShopsService: MemberShopsService) {}

  @ApiOperation({ summary: '商家查看用户列表', description: '商铺绑定' })
  @Get('list/:shop_id')
  userList(@Param('shop_id') shop_id: string) {
    return this.memberShopsService.findAll(shop_id);
  }

  @ApiBody({
    type: CreateMemberShopDto,
  })
  @ApiOperation({ summary: '商铺绑定', description: '商铺绑定' })
  @Post('bind')
  bind(@Body() createMemberShopDto: CreateMemberShopDto) {
    return this.memberShopsService.bind(createMemberShopDto);
  }

  @ApiBody({
    type: ListMemberShopDto,
  })
  @ApiOperation({ summary: '商铺列表', description: '商铺列表' })
  @Post('lists')
  lists(@Body() listMemberShopDto: ListMemberShopDto) {
    return this.memberShopsService.lists(listMemberShopDto);
  }

  @ApiBody({
    type: DetailMemberShopDto,
  })
  @ApiOperation({ summary: '商铺详情', description: '商铺详情' })
  @Post('detail')
  detail(@Body() detailMemberShopDto: DetailMemberShopDto) {
    return this.memberShopsService.detail(detailMemberShopDto);
  }

  @ApiBody({
    type: ShopCategiriesDto,
  })
  @ApiOperation({ summary: '商铺分类', description: '商铺分类' })
  @Post('categories')
  categories(@Body() shopCategiriesDto: ShopCategiriesDto) {
    return this.memberShopsService.categories(shopCategiriesDto);
  }
}
