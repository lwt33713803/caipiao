import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';

export class LoginMemberDto extends PartialType(CreateMemberDto) {}
