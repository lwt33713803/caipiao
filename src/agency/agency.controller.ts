import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agencyService.create(createAgencyDto);
  }

  @ApiOperation({ summary: '代理数据', description: '代理数据明细' })
  @Get('desc/:shop_id')
  desc(@Param('shop_id') shop_id: string) {
    return this.agencyService.getDesc(shop_id);
  }

  @ApiOperation({ summary: '代理列表', description: '代理列表' })
  @Get('list/:shop_id')
  list(@Param('shop_id') shop_id: string) {
    return this.agencyService.getList(shop_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agencyService.findOne(+id);
  }
}
