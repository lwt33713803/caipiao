import { Controller, Post, Body } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginMemberDto } from './dto/login-member.dto';
import { RegisterMemberDto } from './dto/register-member.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @ApiOperation({ summary: '会员登录', description: '会员登录' })
  @Post('login')
  login(@Body() loginMemberDto: LoginMemberDto) {
    return this.memberService.login(loginMemberDto);
  }
}
