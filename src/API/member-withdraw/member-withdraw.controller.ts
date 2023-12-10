import { Controller, Post, Body } from '@nestjs/common';
import { MemberWithdrawService } from './member-withdraw.service';
import { CreateMemberWithdrawDto } from './dto/create-member-withdraw.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('App会员提现')
@Controller('member-withdraw')
export class MemberWithdrawController {
  constructor(private readonly memberWithdrawService: MemberWithdrawService) {}

  @ApiBody({
    type: CreateMemberWithdrawDto,
  })
  @Post('create')
  create(@Body() createMemberWithdrawDto: CreateMemberWithdrawDto) {
    return this.memberWithdrawService.create(createMemberWithdrawDto);
  }
}
