import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberInterface } from './interfaces/member.interface';
import { RegisterMemberDto } from './dto/register-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { ApiException } from 'src/common/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import erypto from 'src/common/utils/erypto';
import { randomString } from 'src/common/utils/tools';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('member') private readonly memberModel: Model<MemberInterface>,
  ) {}

  async create(registerMemberDto: RegisterMemberDto) {
    let parents = {};

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

      parents = {
        parent_id: existsInviteCode._id,
        parents: existsInviteCode.parents,
      };
    }
    //密码处理
    const inviteCode = randomString(6);
    const salt = randomString(6);
    const encryptedPassword = erypto(registerMemberDto.password, salt);
    //会员对象初始化
    const member: MemberInterface = {
      phone: registerMemberDto.phone,
      password: encryptedPassword,
      name: '',
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
    const encryptedPassword = erypto(
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
      { $set: { token: token } },
    );
    return { token: token };
  }

  async info(token: string) {
    const info = await this.memberModel.findOne({
      token: token,
      isLogin: true,
    });
    if (!info) {
      throw new ApiException(
        '登录失效，请重新登录',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    return info;
  }
}
