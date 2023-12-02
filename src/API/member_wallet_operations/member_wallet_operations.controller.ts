import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberWalletOperationsService } from './member_wallet_operations.service';
import { CreateMemberWalletOperationDto } from './dto/create-member_wallet_operation.dto';
import { UpdateMemberWalletOperationDto } from './dto/update-member_wallet_operation.dto';

@Controller('member-wallet-operations')
export class MemberWalletOperationsController {
  constructor(private readonly memberWalletOperationsService: MemberWalletOperationsService) {}

  @Post()
  create(@Body() createMemberWalletOperationDto: CreateMemberWalletOperationDto) {
    return this.memberWalletOperationsService.create(createMemberWalletOperationDto);
  }

  @Get()
  findAll() {
    return this.memberWalletOperationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberWalletOperationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberWalletOperationDto: UpdateMemberWalletOperationDto) {
    return this.memberWalletOperationsService.update(+id, updateMemberWalletOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberWalletOperationsService.remove(+id);
  }
}
