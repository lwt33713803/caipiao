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
import { MemberInterface } from 'src/API/member/interfaces/member.interface';
import { OrderInterface } from './interfaces/order.interface';
import { MemberWalletOperationsService } from '../API/member_wallet_operations/member_wallet_operations.service';
import { ApiGetOrderDetailDto } from './dto/api-order-detail.dto';

@ApiTags('订单管理')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly memberServer: MemberService,
    private readonly memberWalletOperationsService: MemberWalletOperationsService,
  ) {}

  @Get('findAll')
  async findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: '我的信息', description: '我的信息-列表' })
  @Get('myInfo')
  async myInfo(
    @Query('shop_id') shop_id: string,
    @Query('status') status: string,
  ) {
    return this.orderService.myInfo(shop_id, status);
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
  @ApiOperation({ summary: 'app下单', description: 'app下单' })
  @Post('make')
  make(@Body() apiCreateOrderDto: ApiCreateOrderDto) {
    return this.orderService.createOrder(apiCreateOrderDto);
  }

  @ApiBody({
    type: ApiGetOrderDto,
  })
  @ApiOperation({ summary: 'app订单列表', description: 'app订单列表' })
  @Post('list')
  list(@Body() apiGetOrderDto: ApiGetOrderDto) {
    return this.orderService.getOrderByToken(
      apiGetOrderDto.token,
      apiGetOrderDto.status,
    );
  }

  @ApiBody({
    type: ApiGetOrderDetailDto,
  })
  @ApiOperation({ summary: '订单详情', description: '订单详情' })
  @Post('detail')
  detail(@Body() apiGetOrderDetailDto: ApiGetOrderDetailDto) {
    return this.orderService.getOrderDetailByToken(
      apiGetOrderDetailDto.token,
      apiGetOrderDetailDto.order_id,
    );
  }

  @ApiBody({
    type: ApiPayOrderDto,
  })
  @ApiOperation({ summary: 'app支付订单', description: 'app支付订单' })
  @Post('pay')
  async pay(@Body() apiPayOrderDto: ApiPayOrderDto) {
    //订单信息
    const order: OrderInterface = await this.orderService.queryOrderById(
      apiPayOrderDto.order_id,
    );

    //会员信息
    const member: MemberInterface = await this.memberServer.info(
      apiPayOrderDto.token,
    );

    if (order.pay_status === 1) {
      throw new ApiException('订单已支付', ApiErrorCode.FORBIDDEN);
    }

    if (member.amount < order.money) {
      throw new ApiException('账户余额不足，请充值', ApiErrorCode.FORBIDDEN);
    }
    //支付操作
    const before = member.amount;
    //扣除金额。
    member.amount = member.amount - order.money;
    //保存消费日志
    this.memberWalletOperationsService.create(
      member._id,
      'buy',
      order.money,
      before,
      member.amount,
      'sub',
    );
    //修改订单状态。
    order.pay_status = 1;
    member.waitShow = member.waitShow + 1;
    member.totalOrder += order.money;
    member.save();
    order.save();

    return 'success';
  }
}
