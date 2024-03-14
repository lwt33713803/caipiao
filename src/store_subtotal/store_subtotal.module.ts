import { Module } from '@nestjs/common';
import { StoreSubtotalService } from './store_subtotal.service';
import { StoreSubtotalController } from './store_subtotal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubtotalSchema } from './schemas/store_subtotal.schema';

const SubtotalTable = MongooseModule.forFeature([
  {
    name: 'ShopsAccountModel',
    schema: SubtotalSchema,
  },
]);

@Module({
  imports: [SubtotalTable],
  controllers: [StoreSubtotalController],
  providers: [StoreSubtotalService],
})
export class StoreSubtotalModule {}
