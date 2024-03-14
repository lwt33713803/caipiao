import { PartialType } from '@nestjs/swagger';
import { CreateSellerSubtotalDto } from './create-seller_subtotal.dto';

export class UpdateSellerSubtotalDto extends PartialType(CreateSellerSubtotalDto) {}
