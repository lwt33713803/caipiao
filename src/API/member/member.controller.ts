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
  @Post()
  register(@Body() registerMemberDto: RegisterMemberDto) {
    return this.memberService.create(registerMemberDto);
  }

  @Post()
  login(@Body() loginMemberDto: LoginMemberDto) {
    return this.memberService.create(loginMemberDto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
