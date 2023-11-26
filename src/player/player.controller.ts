import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('玩家数据')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playerService.create(createPlayerDto);
  }

  @Get('search')
  async search() {
    return await this.playerService.findSearch()
  }

  @Get('all')
  async findAll(
    @Query('shop_id') shop_id: string,
    @Query('type') type: string,
  ) {
    return await this.playerService.findAll(shop_id, type);
  }
  @Get('num')
  async findNum(
    @Query('shop_id') shop_id: string,
  ) {
    return await this.playerService.findNum(shop_id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}
