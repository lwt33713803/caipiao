import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LotteryTypesService } from './lottery_types.service';
import { CreateLotteryTypeDto } from './dto/create-lottery_type.dto';
import { UpdateLotteryTypeDto } from './dto/update-lottery_type.dto';

@Controller('lottery-types')
export class LotteryTypesController {
  constructor(private readonly lotteryTypesService: LotteryTypesService) {}

  @Post()
  create(@Body() createLotteryTypeDto: CreateLotteryTypeDto) {
    return this.lotteryTypesService.create(createLotteryTypeDto);
  }

  @Get()
  findAll() {
    return this.lotteryTypesService.findAll();
  }

  @Get(':shop_id')
  findOne(@Param('shop_id') shop_id: string) {
    return this.lotteryTypesService.findOne(shop_id);
  }

  @Post('up/:id')
  upLottery(
    @Param('id') id: string,
    @Body() updateLotteryTypeDto: UpdateLotteryTypeDto,
  ) {
    // updateLotteryTypeDto['updatedAt'] = new Date()
    return this.lotteryTypesService.upLottery(id, updateLotteryTypeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLotteryTypeDto: UpdateLotteryTypeDto,
  ) {
    return this.lotteryTypesService.update(+id, updateLotteryTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotteryTypesService.remove(+id);
  }
}
