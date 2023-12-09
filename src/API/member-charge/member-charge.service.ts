import { Injectable } from '@nestjs/common';
import { CreateMemberChargeDto } from './dto/create-member-charge.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberChargeInterface } from './interfaces/member-charge.interface';
import { MemberService } from '../member/member.service';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class MemberChargeService {
  constructor(
    @InjectModel('charges')
    private readonly memberCharge: Model<MemberChargeInterface>,
    private readonly memberService: MemberService,
  ) {}

  async create(createMemberChargeDto: CreateMemberChargeDto) {
    const member = await this.memberService.info(createMemberChargeDto.token);

    if (!member) {
      throw new ApiException('请重新登录', ApiErrorCode.TOKEN_INVALID);
    }

    const rawPre = (Date.now() - new Date(1624206802955).getTime()) / 10000;
    const preNumber = Number(rawPre.toFixed()) * 10000;
    const randam = Math.floor(Math.random() * 10000);
    const order_id = preNumber + randam;

    const memberInfo = {
      order_id: order_id,
      state: '0',
      amount: createMemberChargeDto.amount,
      create_time: Date(),
      member: member._id,
    };

    return this.memberCharge.create(memberInfo);
  }
}
