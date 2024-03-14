import { Module } from '@nestjs/common';
import { SellerSubtotalService } from './seller_subtotal.service';
import { SellerSubtotalController } from './seller_subtotal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSubtotalSchema } from './schemas/seller_subtotal.schema';

const SellerSubtotalTable = MongooseModule.forFeature([
  {
    name: 'ShopsAccountModel',
    schema: SellerSubtotalSchema,
  },
]);

@Module({
  imports: [SellerSubtotalTable],
  controllers: [SellerSubtotalController],
  providers: [SellerSubtotalService],
})
export class SellerSubtotalModule {}
