import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Post,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateShopDto, Recharge } from './dto/create-shop.dto';
import { ShopsInterface } from './interfaces/shops.interface';

@ApiTags('店铺信息')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  create(@Body() shopsInterface: ShopsInterface) {
    console.log(shopsInterface);
    return this.shopsService.create(shopsInterface);
  }

  @Get('info')
  async findMyInfo(@Query('shop_id') shop_id: string) {
    const data = await this.shopsService.myInfo(shop_id);
    if (data) {
      const { remaining_sum, trust_sum, receipt_manage } = data;
      return {
        remaining_sum, // 店铺余额
        trust_sum, // 托管余额
        receipt_manage, // 店铺支持
      };
    }
    return {};
  }

  @Get('staff')
  async findStaffList(@Query('shop_id') shop_id: string) {
    const data = await this.shopsService.myInfo(shop_id);
    if (!data) return [];
    return data.clerk_manage;
  }

  // 充值
  @Post('recharge')
  recharge(@Body() Recharge: Recharge) {
    const { id, num } = Recharge;
    return this.shopsService.recharge(id, num);
  }
}
