import { Module } from '@nestjs/common';
import { MemberShopsService } from './member_shops.service';
import { MemberShopsController } from './member_shops.controller';

@Module({
  controllers: [MemberShopsController],
  providers: [MemberShopsService],
})
export class MemberShopsModule {}
