import { Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency } from './schemas/shops_account.schema';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class AgencyService {
  constructor(
    @InjectModel('AgencyModel')
    private readonly AgencyModel: Model<Agency>,
  ) {}

  async create(createAgencyDto: CreateAgencyDto) {
    const { member_id } = createAgencyDto;
    const ex = await this.AgencyModel.findOne({ member_id });
    if (ex) {
      throw new ApiException('用户已绑定!', ApiErrorCode.FORBIDDEN);
    }
    return await this.AgencyModel.create(createAgencyDto);
  }

  async getDesc(shop_id: string) {
    const list = await this.AgencyModel.find({ shop_id });
    return {
      // register_total 注册人数、agency_total 代理销售额、brokerage_total 佣金
      register_total: list.length,
      agency_total: '',
      brokerage_total: '',
    };
  }

  async getList(shop_id: string) {
    return await this.AgencyModel.find({ shop_id });
  }

  findOne(id: number) {
    return `This action returns a #${id} agency`;
  }
}
