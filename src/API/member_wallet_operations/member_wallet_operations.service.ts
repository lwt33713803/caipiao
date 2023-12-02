import { Injectable } from '@nestjs/common';
import { CreateMemberWalletOperationDto } from './dto/create-member_wallet_operation.dto';
import { UpdateMemberWalletOperationDto } from './dto/update-member_wallet_operation.dto';

@Injectable()
export class MemberWalletOperationsService {
  create(createMemberWalletOperationDto: CreateMemberWalletOperationDto) {
    return 'This action adds a new memberWalletOperation';
  }

  findAll() {
    return `This action returns all memberWalletOperations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberWalletOperation`;
  }

  update(id: number, updateMemberWalletOperationDto: UpdateMemberWalletOperationDto) {
    return `This action updates a #${id} memberWalletOperation`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberWalletOperation`;
  }
}
