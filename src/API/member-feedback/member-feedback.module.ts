import { Module } from '@nestjs/common';
import { MemberFeedbackService } from './member-feedback.service';
import { MemberFeedbackController } from './member-feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberFeedbackSchema } from './schemas/member-feedback.schema';

const table = MongooseModule.forFeature([
  {
    name: 'feedback',
    schema: MemberFeedbackSchema,
  },
]);

@Module({
  imports: [table],
  controllers: [MemberFeedbackController],
  providers: [MemberFeedbackService],
})
export class MemberFeedbackModule {}
