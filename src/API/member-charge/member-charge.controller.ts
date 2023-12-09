import { Controller, Post, Body } from '@nestjs/common';
import { MemberChargeService } from './member-charge.service';
import { CreateMemberChargeDto } from './dto/create-member-charge.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('APP会员充值')
@Controller('member-charge')
export class MemberChargeController {
  constructor(private readonly memberChargeService: MemberChargeService) {}

  @ApiBody({
    type: CreateMemberChargeDto,
  })
  @ApiOperation({ summary: '会员充值', description: '会员充值' })
  @Post('create')
  create(@Body() createMemberChargeDto: CreateMemberChargeDto) {
    return this.memberChargeService.create(createMemberChargeDto);
  }
}
