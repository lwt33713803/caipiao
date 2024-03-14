import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerSubtotalService } from './seller_subtotal.service';
import { CreateSellerSubtotalDto } from './dto/create-seller_subtotal.dto';
import { UpdateSellerSubtotalDto } from './dto/update-seller_subtotal.dto';

@Controller('seller-subtotal')
export class SellerSubtotalController {
  constructor(private readonly sellerSubtotalService: SellerSubtotalService) {}

  @Post()
  create(@Body() createSellerSubtotalDto: CreateSellerSubtotalDto) {
    return this.sellerSubtotalService.create(createSellerSubtotalDto);
  }

  @Get()
  findAll() {
    return this.sellerSubtotalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerSubtotalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerSubtotalDto: UpdateSellerSubtotalDto) {
    return this.sellerSubtotalService.update(+id, updateSellerSubtotalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerSubtotalService.remove(+id);
  }
}
