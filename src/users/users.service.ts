import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersInterface } from './interfaces/users.interface';
import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('UsersModel')
    private readonly usrsModel: Model<UsersInterface>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usrsModel.create(createUserDto);
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
    console.log(page);
    return this.usrsModel
      .find()
      .limit(page_size)
      .skip((page - 1) * page_size);
  }

  getTotals() {
    return this.usrsModel.count();
  }

  getUserByName(user: CreateUserDto) {
    return this.usrsModel.findOne({ name: user.name });
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

  orderList(queryOrderDto: QueryOrderDto) {
    console.log(`QueryOrderDto`, queryOrderDto);
    // if (type == 0) {
    //   return {
    //     type: '未出单',
    //     data: [],
    //   };
    // }
    // if (type == 1) {
    //   return {
    //     type: '未出票',
    //     data: [],
    //   };
    // }
    // if (type == 2) {
    //   return {
    //     type: '合作出票',
    //     data: [],
    //   };
    // }
    // if (type == 3) {
    //   return {
    //     type: '派单未出',
    //     data: [],
    //   };
    // }
  }
}
