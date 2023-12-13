import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersInterface } from './interfaces/users.interface';
import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LotteryTypes } from '../lottery_types/schemas/lottery_types.schema';
import { defaultSystem } from '../lottery_types/dto/create-lottery_type.dto';
import { Shops } from '../shops/schemas/shops.schema';
import { defaultInfo } from '../shops/dto/create-shop.dto';
import { Clerk } from 'src/clerk/schemas/clerk.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('UsersModel')
    private readonly usrsModel: Model<UsersInterface>,

    @InjectModel('LotteryTypesModel')
    private readonly lotteryTypesModule: Model<LotteryTypes>,

    @InjectModel('ShopsModel')
    private readonly ShopsModel: Model<Shops>,

    @InjectModel('ClerkModel') private readonly clerkModel: Model<Clerk>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, shop_id, shop_name } = createUserDto;
    const data = await this.usrsModel.findOne({ name });
    if (!data) {
      defaultSystem['shop_id'] = shop_id;
      defaultSystem['shop_name'] = shop_name;
      defaultInfo['shop_id'] = shop_id;
      defaultInfo['shop_name'] = shop_name;
      // 添加 彩种设置
      this.lotteryTypesModule.create(defaultSystem);
      // 添加 个人信息
      this.ShopsModel.create(defaultInfo);
      this.usrsModel.create(createUserDto);
      return '注册成功';
    }
    throw new ApiException('用户已存在', ApiErrorCode.FORBIDDEN);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.usrsModel.updateOne({ _id: updateUserDto._id }, updateUserDto);
  }

  updatePasswordByID(id: string, password: string) {
    return this.usrsModel.updateOne(
      { _id: id },
      { $set: { password: password } },
    );
  }
  getAll(page: number, page_size: number) {
    return this.usrsModel
      .find()
      .limit(page_size)
      .skip((page - 1) * page_size);
  }

  getTotals() {
    return this.usrsModel.count();
  }

  getShopsByName(user: CreateUserDto) {
    return this.usrsModel.findOne({ name: user.name, password: user.password });
  }

  async findStaffBindShops(shop_id) {
    return this.usrsModel.findOne({ shop_id });
  }

  async getStaffByName(createStaffDto) {
    const {
      staff_name: clerk_name,
      staff_phone: clerk_phone,
      staff_password: clerk_password,
    } = createStaffDto;

    return await this.clerkModel.findOne({
      clerk_name,
      clerk_phone,
      clerk_password,
    });

    // console.log('createStaffDto', createStaffDto);

    // const clerk = await this.clerkModel.findOne({
    //   clerk_name,
    //   clerk_phone,
    //   clerk_password,
    // });
    // if (!clerk) {
    //   throw new ApiException('填写信息有无', ApiErrorCode.FORBIDDEN);
    // }
    // const { shop_id } = clerk;
  }

  getOneByToken(token: string) {
    return this.usrsModel.findOne({ token: token });
  }

  createToken() {
    return crypto.randomUUID();
  }

  async setTokenToUser(token: string, id: string) {
    return this.usrsModel.findByIdAndUpdate(id, {
      token: token,
    });
  }
}
