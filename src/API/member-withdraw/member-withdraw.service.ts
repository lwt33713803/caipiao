import { Injectable } from '@nestjs/common';
import { CreateMemberWithdrawDto } from './dto/create-member-withdraw.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberWithdrawInterface } from './interfaces/member-withdraw.interface';
import { MemberService } from '../member/member.service';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class MemberWithdrawService {
  constructor(
    @InjectModel('withdraw')
    private readonly memberWithdraw: Model<MemberWithdrawInterface>,
    private readonly memberService: MemberService,
  ) {}

  async create(createMemberWithdrawDto: CreateMemberWithdrawDto) {
    const member = await this.memberService.info(createMemberWithdrawDto.token);
    if (!member) {
      throw new ApiException('获取失败，请重新登录', ApiErrorCode.FORBIDDEN);
    }

    if (member.amount < createMemberWithdrawDto.amount) {
      throw new ApiException('余额不足', ApiErrorCode.FORBIDDEN);
    }
    member.amount = member.amount - createMemberWithdrawDto.amount;
    member.save();

    this.memberWithdraw.create({
      member: member._id,
      amount: createMemberWithdrawDto.amount,
      state: 0,
      create_time: Date.now(),
    });

    return member.amount;
  }
}
