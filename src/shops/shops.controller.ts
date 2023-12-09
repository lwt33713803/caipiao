import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Post,
  Res,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateShopDto, Recharge } from './dto/create-shop.dto';
import { ShopsInterface } from './interfaces/shops.interface';

import { image } from 'qr-image';
import * as qrcode from 'qrcode';

@ApiTags('店铺信息')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  // @Get('qrcode')
  // getQrCode(@Query('shop_id') shop_id: string, @Res() res: any) {
  //   const code = image('http://47.96.71.44/', { type: 'png', margin: 2 }).pipe(
  //     res,
  //   );
  //   const data = qrcode.toDataURL(code)
  //   console.log(data)
  // }

  @Post()
  create(@Body() shopsInterface: ShopsInterface) {
    return this.shopsService.create(shopsInterface);
  }

  @Get('info')
  async findMyInfo(@Query('shop_id') shop_id: string) {
    const data = await this.shopsService.myInfo(shop_id);
    if (data) {
      const {
        remaining_sum,
        trust_sum,
        receipt_manage,
        shop_name,
        shop_master,
        shop_phone,
      } = data;
      return {
        remaining_sum: remaining_sum.toFixed(2), // 店铺余额
        trust_sum: trust_sum.toFixed(2), // 托管余额
        receipt_manage, // 店铺支持
        shop_name,
        shop_phone,
        shop_master,
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
