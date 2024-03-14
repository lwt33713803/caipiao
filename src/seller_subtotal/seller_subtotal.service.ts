import { Injectable } from '@nestjs/common';
import { CreateSellerSubtotalDto } from './dto/create-seller_subtotal.dto';
import { UpdateSellerSubtotalDto } from './dto/update-seller_subtotal.dto';

@Injectable()
export class SellerSubtotalService {
  create(createSellerSubtotalDto: CreateSellerSubtotalDto) {
    return 'This action adds a new sellerSubtotal';
  }

  findAll() {
    return `This action returns all sellerSubtotal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerSubtotal`;
  }

  update(id: number, updateSellerSubtotalDto: UpdateSellerSubtotalDto) {
    return `This action updates a #${id} sellerSubtotal`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerSubtotal`;
  }
}
