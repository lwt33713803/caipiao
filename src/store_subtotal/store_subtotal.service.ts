import { Injectable } from '@nestjs/common';
import { CreateStoreSubtotalDto } from './dto/create-store_subtotal.dto';
import { UpdateStoreSubtotalDto } from './dto/update-store_subtotal.dto';

@Injectable()
export class StoreSubtotalService {
  create(createStoreSubtotalDto: CreateStoreSubtotalDto) {
    return 'This action adds a new storeSubtotal';
  }

  findAll() {
    return `This action returns all storeSubtotal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeSubtotal`;
  }

  update(id: number, updateStoreSubtotalDto: UpdateStoreSubtotalDto) {
    return `This action updates a #${id} storeSubtotal`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeSubtotal`;
  }
}
