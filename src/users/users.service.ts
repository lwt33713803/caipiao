import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersInterface } from './interfaces/users.interface';
import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.usrsModel.create(updateUserDto);
  }

  getAll() {
    return this.usrsModel.find();
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
