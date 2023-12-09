import { Body, Controller, Post } from '@nestjs/common';
import { MemberWalletOperationsService } from './member_wallet_operations.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMemberWalletOperationDto } from './dto/get-member_wallet_operation.dto';

@ApiTags('帐变记录')
@Controller('member-wallet-operations')
export class MemberWalletOperationsController {
  constructor(
    private readonly memberWalletOperationsService: MemberWalletOperationsService,
  ) {}

  @ApiBody({
    type: GetMemberWalletOperationDto,
  })
  @ApiOperation({ summary: '帐变记录', description: '帐变记录' })
  @Post('lists')
  lists(@Body() getMemberWalletOperationDto: GetMemberWalletOperationDto) {
    return this.memberWalletOperationsService.findByToken(
      getMemberWalletOperationDto.token,
      getMemberWalletOperationDto.type,
    );
  }
}
