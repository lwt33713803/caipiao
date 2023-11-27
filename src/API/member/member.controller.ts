import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { RegisterMemberDto } from './dto/register-member.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('APP会员管理')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ summary: '会员注册', description: '会员注册' })
  @Post('register')
  register(@Body() registerMemberDto: RegisterMemberDto) {
    return this.memberService.create(registerMemberDto);
  }

  @ApiOperation({ summary: '会员登录', description: '会员登录' })
  @Post('login')
  login(@Body() loginMemberDto: LoginMemberDto) {
    return this.memberService.create(loginMemberDto);
  }
}
