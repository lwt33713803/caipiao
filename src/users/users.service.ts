import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
  getAll() {
    return this.usrsModel.find();
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
}
