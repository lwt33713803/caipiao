import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}


  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
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
}
