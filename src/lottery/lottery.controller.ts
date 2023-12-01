import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('派奖')
@Controller('lottery')
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Post()
  create(@Body() createLotteryDto: CreateLotteryDto) {
    return this.lotteryService.create(createLotteryDto);
  }

  // 派奖列表
  @Get('all/:shop_id')
  findAll(@Param('shop_id') shop_id: string, @Query('type') type: number) {
    return this.lotteryService.findAll(shop_id, type);
  }

  // 派奖
  @Get('use')
  useItem(@Query('id') id: string, @Query('shop_id') shop_id: string) {
    return this.lotteryService.useItem(id, shop_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotteryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLotteryDto: UpdateLotteryDto) {
    return this.lotteryService.update(+id, updateLotteryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotteryService.remove(+id);
  }
}
