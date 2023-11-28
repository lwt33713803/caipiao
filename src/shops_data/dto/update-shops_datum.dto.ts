import { PartialType } from '@nestjs/swagger';
import { CreateShopsDatumDto } from './create-shops_datum.dto';

export class UpdateShopsDatumDto extends PartialType(CreateShopsDatumDto) {}
