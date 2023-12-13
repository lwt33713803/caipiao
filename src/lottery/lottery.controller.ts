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
import { UseLotteryDto } from './dto/use-lottery.dto';

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
  @Post('use')
  useItem(@Body() useLotteryDto: UseLotteryDto) {
    const { order_id, shop_id, user_id } = useLotteryDto;
    return this.lotteryService.useItem(order_id, shop_id, user_id);
  }


}
