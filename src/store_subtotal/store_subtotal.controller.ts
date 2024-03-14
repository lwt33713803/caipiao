import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreSubtotalService } from './store_subtotal.service';
import { CreateStoreSubtotalDto } from './dto/create-store_subtotal.dto';
import { UpdateStoreSubtotalDto } from './dto/update-store_subtotal.dto';

@Controller('store-subtotal')
export class StoreSubtotalController {
  constructor(private readonly storeSubtotalService: StoreSubtotalService) {}

  @Post('create')
  create(@Body() createStoreSubtotalDto: CreateStoreSubtotalDto) {
    return this.storeSubtotalService.create(createStoreSubtotalDto);
  }

  @Get()
  findAll() {
    return this.storeSubtotalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSubtotalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreSubtotalDto: UpdateStoreSubtotalDto) {
    return this.storeSubtotalService.update(+id, updateStoreSubtotalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSubtotalService.remove(+id);
  }
}
