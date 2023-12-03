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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('UsersModel')
    private readonly usrsModel: Model<UsersInterface>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name } = createUserDto;
    const data = await this.usrsModel.findOne({ name });
    if(!data) return this.usrsModel.create(createUserDto);
    throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
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
    return this.usrsModel.findOne({ name: user.name, password: user.password });
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
