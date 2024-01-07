import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Ip,
  Headers,
  Patch,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateStaffDto,
  CreateUserDto,
  AdminListDto,
} from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogService } from '../log/log.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import mongoose from 'mongoose';
import { ShopsService } from '../shops/shops.service';

@ApiTags('用户管理接口')
@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Inject(LogService)
  private readonly logService: LogService;

  @Inject(ShopsService)
  private readonly shopsService: ShopsService;

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    const token = this.usersService.createToken();
    const shop_id = new mongoose.Types.ObjectId().toString();
    createUserDto['token'] = token;
    createUserDto['shop_id'] = shop_id;
    createUserDto['state'] = '启用';
    createUserDto['audit'] = 0;
    return this.usersService.create(createUserDto);
  }

  @Patch()
  editUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Get()
  findOne(@Headers('Authorization') token: string) {
    if (!token) {
      throw new HttpException('登录过期，请重新登录', HttpStatus.FORBIDDEN);
    }
    return this.usersService.getOneByToken(token);
  }

  @Get('lists/:page/:page_size')
  async lists(
    @Param('page') page: number,
    @Param('page_size') page_size: number,
  ) {
    const res = await this.usersService.getAll(page, page_size);
    const total = await this.usersService.getTotals();
    return {
      total: total,
      list: res,
    };
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.usersService.updatePasswordByID(
      resetPassword._id,
      resetPassword.password,
    );
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Ip() ip: string) {
    const users: any = await this.usersService.getShopsByName(createUserDto);
    if (!users) {
      throw new HttpException('请输入正确的账户和密码', HttpStatus.BAD_REQUEST);
    }
    if (users.audit === 0) {
      throw new HttpException('账号审核未通过', HttpStatus.BAD_REQUEST);
    }
    if (users.audit === 2) {
      throw new HttpException(
        '该账号已冻结，请联系客服',
        HttpStatus.BAD_REQUEST,
      );
    }
    //生成token
    const token = this.usersService.createToken();
    //记录登录日志
    this.logService.loginSuccessLog(users, ip, createUserDto);
    //存储当前token到用户信息
    this.usersService.setTokenToUser(token, users.id);
    
    // 初次登录录入信息
    const shops = await this.shopsService.myInfo(users.shops_id);
    !shops && (this.usersService.setInfo(users));

    //返回信息
    return {
      token: token,
      name: users.name,
      avatar: 'https://piao1994.oss-cn-beijing.aliyuncs.com/element/demo.png',
      email: 'Ronnie@123.com',
      role: ['admin'],
      shop_id: users.shop_id,
    };
  }

  @Post('staff-login')
  async staffLogin(@Body() createStaffDto: CreateStaffDto, @Ip() ip: string) {
    const { staff_name } = createStaffDto;
    const staff = await this.usersService.getStaffByName(createStaffDto);
    if (!staff)
      throw new HttpException('输入用户信息有误', HttpStatus.BAD_REQUEST);
    const { shop_id } = staff;
    const shops = await this.usersService.findStaffBindShops(shop_id);
    if (!shops)
      throw new HttpException('无法查到商铺信息', HttpStatus.BAD_REQUEST);
    const createUserDto = {
      name: shops.name,
      password: shops.password,
    };
    //生成token
    const token = this.usersService.createToken();
    //记录登录日志
    this.logService.loginSuccessLog(shops, ip, createUserDto);
    //存储当前token到用户信息
    this.usersService.setTokenToUser(token, shops.id);
    //返回信息
    return {
      token: token,
      name: shops.name,
      avatar: 'https://piao1994.oss-cn-beijing.aliyuncs.com/element/demo.png',
      email: 'Ronnie@123.com',
      role: ['staff'],
      shop_id,
      staff_name,
    };
  }

  @Post('refreshToken')
  async refreshToken(@Headers('Authorization') token: string) {
    const user = await this.usersService.getOneByToken(token);
    //生成token
    const new_token = this.usersService.createToken();
    //存储当前token到用户信息
    this.usersService.setTokenToUser(new_token, user.id);
    return { token: new_token };
  }

  @Post('adminLogin')
  async adminLogin(@Body() createUserDto: CreateUserDto, @Ip() ip: string) {
    const shops: any = await this.usersService.getShopsByName(createUserDto);
    if (!shops) {
      throw new HttpException('请输入正确的账户和密码', HttpStatus.BAD_REQUEST);
    }
    if (shops.audit === 0) {
      throw new HttpException('账号审核未通过', HttpStatus.BAD_REQUEST);
    }
    //生成token
    const token = this.usersService.createToken();
    //记录登录日志
    this.logService.loginSuccessLog(shops, ip, createUserDto);
    //存储当前token到用户信息
    this.usersService.setTokenToUser(token, shops.id);
    //返回信息
    return {
      token: token,
      name: shops.name,
      avatar: 'https://piao1994.oss-cn-beijing.aliyuncs.com/element/demo.png',
      email: 'Ronnie@123.com',
      role: ['admin'],
      shop_id: shops.shop_id,
    };
  }

  @Post('adminList')
  getAdminList(@Body() adminListDto: AdminListDto) {
    return this.usersService.getAdminList(adminListDto);
  }

  @Post('adminList/audit')
  async auditAdminList(@Body() adminListDto: AdminListDto) {
    const { shop_id, shop_name } = adminListDto;
    return this.usersService.audit(shop_id, shop_name);
  }

  @ApiOperation({ summary: '停用', description: 'admin 停用' })
  @Post('adminList/stop')
  async stopAdminList(@Body() adminListDto: AdminListDto) {
    const { shop_id } = adminListDto;
    return this.usersService.stop(shop_id);
  }

  @ApiOperation({ summary: '解除', description: 'admin 解除停用' })
  @Post('adminList/relieve')
  async relieveAdminList(@Body() adminListDto: AdminListDto) {
    const { shop_id } = adminListDto;
    return this.usersService.relieve(shop_id);
  }
}
