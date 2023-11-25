import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClerkDto } from './dto/create-clerk.dto';
import { UpdateClerkDto } from './dto/update-clerk.dto';
import { Model } from 'mongoose';
import { Clerk } from './schemas/clerk.schema';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { ApiException } from '../common/filters/api.exception';

@Injectable()
export class ClerkService {
  constructor(
    @InjectModel('ClerkModel') private readonly clerkModel: Model<Clerk>,
  ) {}

  async create(createClerkDto: CreateClerkDto) {
    const { clerk_phone } = createClerkDto;
    const existUser = await this.clerkModel.findOne({ clerk_phone });
    if (!existUser) {
      this.clerkModel.create(createClerkDto);
      return { code: 200, msg: '创建成功' };
    }
    throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
  }

  async findAll(shop_id: string) {
    return await this.clerkModel.find({ shop_id }).exec();
  }

  update(id: number, updateClerkDto: UpdateClerkDto) {
    return `This action updates a #${id} clerk`;
  }

  async remove(tel: string) {
    const clerk_phone = tel;
    let exist = await this.clerkModel.findOne({ clerk_phone });
    if (exist) {
      await this.clerkModel.deleteOne({ clerk_phone });
      return {
        code: 200,
        msg: '删除成功',
      };
    }
    return {
      code: 201,
      msg: '用户不存在',
    };
  }
}
