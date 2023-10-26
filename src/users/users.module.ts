import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { LogModule } from '../log/log.module';

const UsersTable = MongooseModule.forFeature([
  {
    name: 'UsersModel',
    schema: UsersSchema,
  },
]);

@Module({
  imports: [UsersTable, LogModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
