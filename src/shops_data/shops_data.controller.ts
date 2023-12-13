import {
  Controller,
  Get,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { ShopsDataService } from './shops_data.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('数据统计')
@Controller('shops-data')
export class ShopsDataController {
  constructor(private readonly shopsDataService: ShopsDataService) {}

  @Get('query/:shop_id')
  findData(
    @Param('shop_id') shop_id: string,
    @Query('start_date') start_date: string,
    @Query('end_date') end_date: string,
  ) {
    return this.shopsDataService.findData(shop_id, start_date, end_date);
  }
}
