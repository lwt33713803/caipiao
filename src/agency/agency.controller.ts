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

  @ApiOperation({ summary: '列表开关', description: '列表开关' })
  @Get('switch')
  setOpen(
    @Query('member_id') member_id: string,
    @Query('open_switch') open_switch: boolean,
  ) {
    return this.agencyService.setOpen(member_id, open_switch);
  }

  @ApiOperation({ summary: '某个代理', description: '某个代理详情' })
  @Get('item/:member_id')
  findItem(@Param('member_id') member_id: string) {
    return this.agencyService.findOne(member_id);
  }

  @ApiOperation({ summary: '修改佣金', description: '修改佣金比例' })
  @Get('set-ratio')
  setRatio(
    @Query('member_id') member_id: string,
    @Query('ratio') ratio: string,
  ) {
    return this.agencyService.setRatio(member_id, ratio);
  }

  @ApiOperation({ summary: '下级管理列表', description: '下级管理列表' })
  @Get('find-subordinate')
  findSubordinate(
    @Query('member_id') member_id: string,
    @Query('type') type: string,
    @Query('start_date') start_date: string,
    @Query('end_date') end_date: string,
  ) {
    console.log('类型 type ==>', type);
    console.log('开始时间 ==>', start_date);
    console.log('结束时间 ==>', end_date);
    return this.agencyService.findSubordinate(member_id);
  }
}
