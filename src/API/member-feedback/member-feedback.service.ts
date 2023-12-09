import { Injectable } from '@nestjs/common';
import { CreateMemberFeedbackDto } from './dto/create-member-feedback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MemberFeedbackInterface } from './interfaces/member-feedback.interface';
import { Model } from 'mongoose';

@Injectable()
export class MemberFeedbackService {
  constructor(
    @InjectModel('feedback')
    private readonly messageModule: Model<MemberFeedbackInterface>,
  ) {}

  create(createMemberFeedbackDto: CreateMemberFeedbackDto) {
    return this.messageModule.create(createMemberFeedbackDto);
  }
}
