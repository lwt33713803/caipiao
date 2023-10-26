import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';

const ProductTable = MongooseModule.forFeature([
  {
    name: 'product',
    schema: ProductSchema,
  },
]);

@Module({
  imports: [ProductTable],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
