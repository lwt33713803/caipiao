import { Controller, Post, Body } from '@nestjs/common';
import { MemberFeedbackService } from './member-feedback.service';
import { CreateMemberFeedbackDto } from './dto/create-member-feedback.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('APP会员反馈')
@Controller('member-feedback')
export class MemberFeedbackController {
  constructor(private readonly memberFeedbackService: MemberFeedbackService) {}

  @ApiBody({
    type: CreateMemberFeedbackDto,
  })
  @ApiOperation({ summary: '会员反馈', description: '会员反馈' })
  @Post('create')
  create(@Body() createMemberFeedbackDto: CreateMemberFeedbackDto) {
    return this.memberFeedbackService.create(createMemberFeedbackDto);
  }
}
