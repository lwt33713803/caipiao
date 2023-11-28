import { Injectable } from '@nestjs/common';
import { CreateShopsDatumDto } from './dto/create-shops_datum.dto';
import { UpdateShopsDatumDto } from './dto/update-shops_datum.dto';

@Injectable()
export class ShopsDataService {
  async findData(shop_id: string, start_date: string, end_date: string) {
    

  }
}
