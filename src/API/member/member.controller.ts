import { Controller, Post, Body } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginMemberDto } from './dto/login-member.dto';
import { RegisterMemberDto } from './dto/register-member.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { InfoMemberDto } from './dto/info-member.dto';

@ApiTags('APP会员管理')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiBody({
    type: RegisterMemberDto,
  })
  @ApiOperation({ summary: '会员注册', description: '会员注册' })
  @Post('register')
  register(@Body() registerMemberDto: RegisterMemberDto) {
    return this.memberService.create(registerMemberDto);
  }

  @ApiBody({
    type: LoginMemberDto,
  })
  @ApiOperation({ summary: '会员登录', description: '会员登录' })
  @Post('login')
  login(@Body() loginMemberDto: LoginMemberDto) {
    return this.memberService.login(loginMemberDto);
  }

  @ApiBody({
    type: InfoMemberDto,
  })
  @ApiOperation({ summary: '会员信息', description: '会员信息' })
  @Post('info')
  info(@Body('token') token: string) {
    if (token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    return this.memberService.info(token);
  }
}
