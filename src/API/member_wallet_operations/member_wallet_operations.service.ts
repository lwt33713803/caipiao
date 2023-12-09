import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberWalletOperationInterface } from './interfaces/member_wallet_operations.interface';
import { MemberService } from '../member/member.service';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class MemberWalletOperationsService {
  constructor(
    @InjectModel('MemberWalletOperation')
    private readonly memberWalletOperation: Model<MemberWalletOperationInterface>,
    @Inject(forwardRef(() => MemberService))
    private readonly memberService: MemberService,
  ) {}

  create(
    member_id: string,
    type: string,
    amount: number,
    before: number,
    after: number,
    operation_method: 'add' | 'sub',
  ) {
    const operation = {
      member: member_id,
      type: type,
      amouont: amount,
      before: before,
      after: after,
      time: Date.now(),
      operation_method: operation_method,
    };
    return this.memberWalletOperation.create(operation);
  }

  findAllByType(type: string) {
    return this.memberWalletOperation.find({ type: type });
  }

  findAll() {
    return this.memberWalletOperation.find();
  }

  async findByToken(token: string, types: string) {
    const member = await this.memberService.info(token);
    console.log(member);
    if (!member) {
      throw new ApiException('请重新登录', ApiErrorCode.TOKEN_INVALID);
    }
    if (types != 'all') {
      return this.memberWalletOperation.find({
        member: member['_id'],
        type: types,
      });
    } else {
      return this.memberWalletOperation.find({ member: member['_id'] });
    }
  }

  findOne(id: string) {
    return this.memberWalletOperation.findById(id);
  }
}
