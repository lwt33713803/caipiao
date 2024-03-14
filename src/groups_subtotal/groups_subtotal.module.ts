import { Module } from '@nestjs/common';
import { GroupsSubtotalService } from './groups_subtotal.service';
import { GroupsSubtotalController } from './groups_subtotal.controller';
import { GroupSubtotalSchema } from './schemas/groups_subtotal.schema';
import { MongooseModule } from '@nestjs/mongoose';

const GroupSubtotalTable = MongooseModule.forFeature([
  {
    name: 'ShopsAccountModel',
    schema: GroupSubtotalSchema,
  },
]);

@Module({
  imports: [GroupSubtotalTable],
  controllers: [GroupsSubtotalController],
  providers: [GroupsSubtotalService],
})
export class GroupsSubtotalModule {}
