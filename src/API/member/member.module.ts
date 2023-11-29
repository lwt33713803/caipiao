import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';

const MemberTable = MongooseModule.forFeature([
  {
    name: 'member',
    schema: MemberSchema,
  },
]);

@Module({
  imports: [MemberTable],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
