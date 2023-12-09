import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberShopsService } from './member_shops.service';
import { CreateMemberShopDto } from './dto/create-member_shop.dto';
import { UpdateMemberShopDto } from './dto/update-member_shop.dto';

@Controller('member-shops')
export class MemberShopsController {
  constructor(private readonly memberShopsService: MemberShopsService) {}

  @Post()
  create(@Body() createMemberShopDto: CreateMemberShopDto) {
    return this.memberShopsService.create(createMemberShopDto);
  }

  @Get()
  findAll() {
    return this.memberShopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberShopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberShopDto: UpdateMemberShopDto) {
    return this.memberShopsService.update(+id, updateMemberShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberShopsService.remove(+id);
  }
}
