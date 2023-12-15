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

  async setOpen(member_id: string, open_switch: boolean) {
    await this.AgencyModel.findOneAndUpdate(
      { member_id },
      { open_switch: !open_switch },
    );
    return '切换成功';
  }

  async findOne(member_id: string) {
    return await this.AgencyModel.findOne({ member_id });
  }

  async setRatio(member_id: string, ratio: string) {
    await this.AgencyModel.findOneAndUpdate({ member_id }, { ratio });
    return '修改成功';
  }

  async findSubordinate(member_id: string) {
    const data = await this.AgencyModel.findOne({ member_id });
    return data.subordinate;
  }
}
