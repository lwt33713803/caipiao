import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { AcceptDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { ApiGetOrderDto } from './dto/api-get-order.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCreateOrderDto } from './dto/api-create-order.dto';

@ApiTags('订单管理')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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

  @Post('orderList')
  async getOrderList(@Body() queryOrderDto: QueryOrderDto) {
    return this.orderService.orderList(queryOrderDto);
  }

  @Post('accept')
  async accept(@Body() acceptDto: AcceptDto) {
    return this.orderService.acceptOrder(acceptDto);
  }

  @ApiBody({
    type: ApiCreateOrderDto,
  })
  @ApiOperation({ summary: 'APP下单', description: 'APP下单' })
  @Post('make')
  make(@Body() apiCreateOrderDto: ApiCreateOrderDto) {
    //获取会员信息
    //计算金额
    //支付并生成订单
    return this.orderService.createOrder(apiCreateOrderDto);
  }

  @ApiBody({
    type: ApiGetOrderDto,
  })
  @ApiOperation({ summary: 'app订单列表', description: '订单列表' })
  @Post('list')
  list(@Body() apiGetOrderDto: ApiGetOrderDto) {
    return this.orderService.getOrderByToken(
      apiGetOrderDto.token,
      apiGetOrderDto.status,
    );
  }
}
