import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMessageDto } from './dto/get-message.dto';
import { ReadMessageDto } from './dto/read-message.dto';
import { MemberService } from '../member/member.service';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { MemberInterface } from '../member/interfaces/member.interface';

@ApiTags('APP会员消息')
@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly memberServer: MemberService,
  ) {}

  @ApiBody({
    type: GetMessageDto,
  })
  @ApiOperation({ summary: '会员消息列表', description: '会员消息列表' })
  @Post('list')
  async list(@Body() getMessageDto: GetMessageDto) {
    const member: MemberInterface = await this.memberServer.info(
      getMessageDto.token,
    );
    if (!member) {
      throw new ApiException('请重新登录', ApiErrorCode.TOKEN_INVALID);
    }
    return this.messageService.findMessageByMemberID(member._id);
  }

  @ApiBody({
    type: ReadMessageDto,
  })
  @ApiOperation({ summary: '消息标记已读', description: '消息标记已读' })
  @Post('read')
  read(@Body() readMessageDto: ReadMessageDto) {
    return this.messageService.readMessage(readMessageDto.id);
  }
}
