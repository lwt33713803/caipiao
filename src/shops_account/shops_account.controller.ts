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
import { ShopsAccountService } from './shops_account.service';
import { CreateShopsAccountDto } from './dto/create-shops_account.dto';
import { UpdateShopsAccountDto } from './dto/update-shops_account.dto';

@Controller('shopsAccount')
export class ShopsAccountController {
  constructor(private readonly shopsAccountService: ShopsAccountService) {}

  @Post()
  create(@Body() createShopsAccountDto: CreateShopsAccountDto) {
    return this.shopsAccountService.create(createShopsAccountDto);
  }

  @Get('query/:shop_id')
  async findAll(
    @Param('shop_id') shop_id: string,
    @Query('type') type: number,
  ) {
    console.log('shop_id', shop_id);
    console.log('type', type);
    return await this.shopsAccountService.findAll(shop_id, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsAccountService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShopsAccountDto: UpdateShopsAccountDto,
  ) {
    return this.shopsAccountService.update(+id, updateShopsAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsAccountService.remove(+id);
  }
}
