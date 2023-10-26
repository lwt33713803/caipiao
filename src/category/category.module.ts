import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';

const categoryTable = MongooseModule.forFeature([
  {
    name: 'category',
    schema: CategorySchema,
  },
]);

@Module({
  imports: [categoryTable],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
