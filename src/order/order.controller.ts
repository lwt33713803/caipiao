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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AcceptDto, UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('findAll')
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('list')
  findOne(
    @Query('shop_id') shop_id: string,
    @Query('status') status: string,
    @Query('type') type: string,
    @Query('sort') sort: string,
  ) {
    return this.orderService.find(shop_id, status, type, sort);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Post('orderList')
  async getOrderList(@Body() queryOrderDto: QueryOrderDto) {
    return this.orderService.orderList(queryOrderDto);
  }

  @Post('accept')
  async accept(@Body() acceptDto: AcceptDto) {
    return this.orderService.acceptOrder(acceptDto);
  }
}
