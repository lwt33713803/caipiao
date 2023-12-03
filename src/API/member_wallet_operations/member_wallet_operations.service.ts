import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberWalletOperationInterface } from './interfaces/member_wallet_operations.interface';
import { MemberService } from '../member/member.service';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { MemberInterface } from '../member/interfaces/member.interface';

@Injectable()
export class MemberWalletOperationsService {
  constructor(
    @InjectModel('MemberWalletOperation')
    private readonly memberWalletOperation: Model<MemberWalletOperationInterface>,
    private readonly memberService: MemberService,
  ) {}

  create(
    member_id: string,
    type: string,
    amount: string,
    before: string,
    after: string,
  ) {
    const operation = {
      member: member_id,
      type: type,
      amouont: amount,
      before: before,
      after: after,
      time: Date.now(),
    };
    return this.memberWalletOperation.create(operation);
  }

  findAllByType(type: string) {
    return this.memberWalletOperation.find({ type: type });
  }

  findAll() {
    return this.memberWalletOperation.find();
  }

  async findByToken(token: string) {
    const member = await this.memberService.info(token);
    console.log(member);
    if (!member) {
      throw new ApiException('请重新登录', ApiErrorCode.TOKEN_INVALID);
    }

    return this.memberWalletOperation.find({ member: member['_id'] });
  }

  findOne(id: string) {
    return this.memberWalletOperation.findById(id);
  }
}
