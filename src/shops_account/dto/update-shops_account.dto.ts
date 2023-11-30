import { PartialType } from '@nestjs/swagger';
import { CreateShopsAccountDto } from './create-shops_account.dto';

export class UpdateShopsAccountDto extends PartialType(CreateShopsAccountDto) {}
