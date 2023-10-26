import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogInterface, loginTypeEnum } from './interfaces/log.interface';
import { UsersInterface } from '../users/interfaces/users.interface';

@Injectable()
export class LogService {
  constructor(
    @InjectModel('log') private readonly logModel: Model<LogInterface>,
  ) {}
  create(createLogDto: CreateLogDto) {
    return this.logModel.create(createLogDto);
  }

  loginSuccessLog(user: UsersInterface, ip: string, input: any) {
    this.create({
      user: user.id,
      method: 'POST',
      uri: '/users/login',
      ip: ip,
      type: loginTypeEnum.token,
      input: input,
    });
  }
}
