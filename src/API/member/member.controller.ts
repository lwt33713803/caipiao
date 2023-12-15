import { Controller, Post, Body } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginMemberDto } from './dto/login-member.dto';
import { RegisterMemberDto } from './dto/register-member.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { InfoMemberDto } from './dto/info-member.dto';
import { ChangeAvatarDto } from './dto/change-avatar.dto';
import { ChangeNickDto } from './dto/change-nick.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { encryptPassword } from 'src/common/utils/erypto';
import { ChangeCertDto } from './dto/change-cert.dto';
import { ChangePhoneDto } from './dto/change-phone.dto';
import { TransferDto } from './dto/transfer.dto';
import { BindWechartDto } from './dto/bind-wechart.dto';
import { BindBankDto } from './dto/bind-bank.dto';
import { GetMemberSubtotalsDto } from './dto/get-member-subtotals.dto';
import { GetInvitedDto } from './dto/get-invited.dto';

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

  @ApiBody({
    type: ChangeAvatarDto,
  })
  @ApiOperation({ summary: '修改头像', description: '修改头像' })
  @Post('avatar')
  async avatar(@Body() changeAvatarDto: ChangeAvatarDto) {
    if (changeAvatarDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(changeAvatarDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    member.avatar = changeAvatarDto.avatar;
    member.save();
    return 'success';
  }

  @ApiBody({
    type: ChangeNickDto,
  })
  @ApiOperation({ summary: '修改昵称', description: '修改昵称' })
  @Post('nick')
  async nick(@Body() changeNickDto: ChangeNickDto) {
    if (changeNickDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(changeNickDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    member.name = changeNickDto.nick;
    member.save();
    return 'success';
  }

  @ApiBody({
    type: ChangePasswordDto,
  })
  @ApiOperation({ summary: '修改登录密码', description: '修改登录密码' })
  @Post('password')
  async password(@Body() changePasswordDto: ChangePasswordDto) {
    if (changePasswordDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(changePasswordDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }

    if (
      encryptPassword(changePasswordDto.oldPassword, member.salt) !=
      member.password
    ) {
      throw new ApiException('旧密码错误', ApiErrorCode.PASSWORD_ERRPR);
    }

    member.password = encryptPassword(changePasswordDto.password, member.salt);
    member.save();
    return 'success';
  }

  @ApiBody({
    type: ChangePasswordDto,
  })
  @ApiOperation({ summary: '修改支付密码', description: '修改支付密码' })
  @Post('payPassword')
  async payPassword(@Body() changeNickDto: ChangePasswordDto) {
    if (changeNickDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(changeNickDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }

    if (member.payPassword) {
      if (
        encryptPassword(changeNickDto.oldPassword, member.salt) !=
        member.payPassword
      ) {
        throw new ApiException('旧密码错误', ApiErrorCode.PASSWORD_ERRPR);
      }
    }

    member.payPassword = encryptPassword(changeNickDto.password, member.salt);
    member.save();
    return 'success';
  }

  @ApiBody({
    type: ChangeCertDto,
  })
  @ApiOperation({ summary: '修改实名', description: '修改实名' })
  @Post('cert')
  async cert(@Body() changeCertDto: ChangeCertDto) {
    if (changeCertDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(changeCertDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }

    if (member.isCert) {
      throw new ApiException(
        '已完成实名，修改实名请联系客服',
        ApiErrorCode.FORBIDDEN,
      );
    }

    member.isCert = true;
    member.certs = {
      cardName: changeCertDto.name,
      cardID: changeCertDto.code,
    };
    member.save();
    return member;
  }

  @ApiBody({
    type: ChangePhoneDto,
  })
  @ApiOperation({ summary: '修改手机', description: '修改手机' })
  @Post('phone')
  async phone(@Body() changeNickDto: ChangePhoneDto) {
    if (changeNickDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(changeNickDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }

    member.phone = changeNickDto.phone;
    member.save();
    return 'success';
  }

  @ApiBody({
    type: BindWechartDto,
  })
  @ApiOperation({ summary: '绑定微信', description: '绑定微信' })
  @Post('bindWechart')
  async bindWechart(@Body() bindWechartDto: BindWechartDto) {
    if (bindWechartDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(bindWechartDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }

    member.third_accounts = {
      ali: bindWechartDto.ali,
      wechart: bindWechartDto.wechart,
    };
    member.save();
    return 'success';
  }

  @ApiBody({
    type: BindBankDto,
  })
  @ApiOperation({ summary: '绑定银行卡', description: '绑定银行卡' })
  @Post('bindBank')
  async bindBank(@Body() bindBankDto: BindBankDto) {
    if (bindBankDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(bindBankDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }

    member.bank_info = {
      bank_name: bindBankDto.bank_name,
      bank_open: bindBankDto.bank_open,
      name: bindBankDto.name,
      account: bindBankDto.account,
    };
    member.save();
    return 'success';
  }

  @ApiBody({
    type: GetMemberSubtotalsDto,
  })
  @ApiOperation({ summary: '用户统计信息', description: '用户统计信息' })
  @Post('totals')
  async totals(@Body() getMemberSubtotalsDto: GetMemberSubtotalsDto) {
    if (getMemberSubtotalsDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(getMemberSubtotalsDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    //
    return this.memberService.totalsById(member._id);
  }

  @ApiBody({
    type: TransferDto,
  })
  @ApiOperation({ summary: '会员转账', description: '会员转账' })
  @Post('transfer')
  async transfer(@Body() transferDto: TransferDto) {
    if (transferDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(transferDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }

    //查询接收人
    const recive_member = await this.memberService.findByPhone(
      transferDto.phone,
    );
    if (!recive_member) {
      throw new ApiException('找不到您要转账的用户', ApiErrorCode.FORBIDDEN);
    }

    if (member.amount < transferDto.amount) {
      throw new ApiException('可用余额不足，转账失败', ApiErrorCode.FORBIDDEN);
    }
    const left_amount = member.amount - transferDto.amount;
    this.memberService.reduceAmount(
      left_amount,
      member._id,
      transferDto.amount,
      member.amount,
      'sub',
      'other',
    );
    const left_amount_recive = recive_member.amount + transferDto.amount;
    this.memberService.reduceAmount(
      left_amount_recive,
      recive_member._id,
      transferDto.amount,
      member.amount,
      'add',
      'other',
    );
    return left_amount;
  }

  @ApiBody({
    type: GetInvitedDto,
  })
  @ApiOperation({ summary: '邀请的用户', description: '邀请的用户' })
  @Post('invited')
  async invited(@Body() getInvitedDto: GetInvitedDto) {
    if (getInvitedDto.token == '') {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const member = await this.memberService.info(getInvitedDto.token);
    if (!member) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const users = await this.memberService.findChildByParendID(member._id);
    return {
      total: users.length,
      list: users,
    };
  }
}
