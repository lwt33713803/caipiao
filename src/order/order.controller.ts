import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { AcceptDto } from './dto/update-order.dto';
import { ApiGetOrderDto } from './dto/api-get-order.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCreateOrderDto } from './dto/api-create-order.dto';
import { ApiPayOrderDto } from './dto/api-pay-order.dto';
import { MemberService } from 'src/API/member/member.service';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@ApiTags('订单管理')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly memberServer: MemberService,
  ) {}

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

  @Post('accept')
  accept(@Body() acceptDto: AcceptDto) {
    return this.orderService.accept(acceptDto);
  }

  @Post('drawer')
  drawer(@Body() acceptDto: AcceptDto) {
    return this.orderService.drawer(acceptDto);
  }

  @Get('query/drawer/:shop_id')
  queryDrawer(
    @Param('shop_id') shop_id: string,
    @Query('status') status: number,
  ) {
    return this.orderService.queryDrawer(shop_id, status);
  }

  @Get('query/desc/:shop_id')
  orderDesc(@Param('shop_id') shop_id: string, @Query('id') id: string) {
    return this.orderService.orderDesc(shop_id, id);
  }

  @ApiBody({
    type: ApiCreateOrderDto,
  })
  @ApiOperation({ summary: 'APP下单', description: 'APP下单' })
  @Post('make')
  make(@Body() apiCreateOrderDto: ApiCreateOrderDto) {
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

  @ApiBody({
    type: ApiPayOrderDto,
  })
  @ApiOperation({ summary: 'app订单列表', description: '订单列表' })
  @Post('pay')
  async pay(@Body() apiPayOrderDto: ApiPayOrderDto) {
    //订单信息
    const order = await this.orderService.queryOrderById(
      apiPayOrderDto.order_id,
    );

    //会员信息
    const member = await this.memberServer.info(apiPayOrderDto.token);
    //支付操作

    if (member.amount < order.money) {
      throw new ApiException('账户余额不足，请充值', ApiErrorCode.FORBIDDEN);
    }

    this.orderService.setOrderPayed(order._id);
    // this.memberServer.

    return this.orderService.payByBalance(order._id);
  }
}
