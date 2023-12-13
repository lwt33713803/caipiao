import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberInterface } from './interfaces/member.interface';
import { RegisterMemberDto } from './dto/register-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { encryptPassword } from 'src/common/utils/erypto';
import { randomString } from 'src/common/utils/tools';
import { MemberWalletOperationsService } from '../member_wallet_operations/member_wallet_operations.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('member') private readonly memberModel: Model<MemberInterface>,
    @Inject(forwardRef(() => MemberWalletOperationsService))
    private readonly memberWalletOperationsService: MemberWalletOperationsService,
  ) {}

  async create(registerMemberDto: RegisterMemberDto) {
    let parents = '';

    //用户名唯一验证
    const existsMember = await this.memberModel.findOne({
      phone: registerMemberDto.phone,
    });
    if (existsMember)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);

    //邀请码存在验证
    if (registerMemberDto.invite_code) {
      const existsInviteCode = await this.memberModel.findOne({
        inviteCode: registerMemberDto.invite_code,
      });
      if (!existsInviteCode)
        throw new ApiException(
          '邀请码不存在',
          ApiErrorCode.INVITE_CODE_NOT_EXISTS,
        );

      parents = existsInviteCode._id;
    }
    //密码处理
    const inviteCode = randomString(6);
    const salt = randomString(6);
    const encryptedPassword = encryptPassword(registerMemberDto.password, salt);
    //会员对象初始化
    const member: MemberInterface = {
      phone: registerMemberDto.phone,
      password: encryptedPassword,
      name: '尚未设置昵称',
      salt: salt,
      avatar: '',
      isCert: false,
      isLogin: false,
      amount: 0.0,
      todayAward: 0,
      token: '',
      waitShow: 0,
      waitAward: 0,
      award: 0,
      inviteCode: inviteCode,
      parents: parents,
    } as MemberInterface;
    return this.memberModel.create(member);
  }

  async login(loginMemberDto: LoginMemberDto) {
    const existsMember = await this.memberModel.findOne({
      phone: loginMemberDto.phone,
    });
    if (!existsMember)
      throw new ApiException('用户不存在', ApiErrorCode.USER_EXIST);
    //验证密码
    const encryptedPassword = encryptPassword(
      loginMemberDto.password,
      existsMember.salt,
    );
    if (encryptedPassword != existsMember.password)
      throw new ApiException(
        '登录失败，用户名或密码错误',
        ApiErrorCode.USER_EXIST,
      );
    //生成token
    const token = randomString(32);
    await this.memberModel.updateOne(
      { _id: existsMember._id },
      { $set: { token: token, isLogin: true } },
    );
    return { token: token };
  }

  async info(token: string) {
    const info = await this.memberModel.findOne({
      token: token,
    });
    if (!info) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    return info;
  }

  async findByPhone(phone: string) {
    const info = await this.memberModel.findOne({
      phone: phone,
    });
    return info;
  }

  //扣减金额，记录帐变
  async reduceAmount(
    after: number,
    member: string,
    amount: number,
    before: number,
    method: 'sub' | 'add',
    type: 'other' | 'buy' | 'charge' | 'award' | 'withdraw',
  ) {
    //记录日志
    this.memberWalletOperationsService.create(
      member,
      type,
      amount,
      before,
      after,
      method,
    );
    //操作金额
    await this.memberModel.findByIdAndUpdate(member, {
      $set: { amount: after },
    });
  }

  totalsById(member_id: string) {
    //
    const data = new Date();
    data.setDate(1);
    data.setHours(0);
    data.setSeconds(0);
    data.setMinutes(0);

    return this.memberModel
      .aggregate([
        {
          $match: {
            parents: member_id,
            create_at: { $get: data.getTime() },
          },
        },
      ])
      .exec();
  }
}
