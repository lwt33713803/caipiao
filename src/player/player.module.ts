import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LogModule } from 'src/log/log.module';
import { PlayerSchema } from './schemas/player.schema';


const PlayerTable = MongooseModule.forFeature([
  {
    name: 'PlayerModel',
    schema: PlayerSchema,
  },
]);

@Module({
  imports: [PlayerTable, LogModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
