import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberWalletOperationInterface } from './interfaces/member_wallet_operations.interface';

@Injectable()
export class MemberWalletOperationsService {
  constructor(
    @InjectModel('MemberWalletOperation')
    private readonly memberWalletOperation: Model<MemberWalletOperationInterface>,
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

  findOne(id: string) {
    return this.memberWalletOperation.findById(id);
  }
}
