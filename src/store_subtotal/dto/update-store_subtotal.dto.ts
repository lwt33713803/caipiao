import { PartialType } from '@nestjs/swagger';
import { CreateStoreSubtotalDto } from './create-store_subtotal.dto';

export class UpdateStoreSubtotalDto extends PartialType(CreateStoreSubtotalDto) {}
