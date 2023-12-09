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
import {
  CreateLotteryTypeDto,
  defaultSystem,
} from './dto/create-lottery_type.dto';
import { UpdateLotteryTypeDto } from './dto/update-lottery_type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('彩种管理')
@Controller('lottery-types')
export class LotteryTypesController {
  constructor(private readonly lotteryTypesService: LotteryTypesService) {}

  @Post()
  create(@Body() createLotteryTypeDto: CreateLotteryTypeDto) {
    console.log(createLotteryTypeDto);
    // return this.lotteryTypesService.create(createLotteryTypeDto);
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
