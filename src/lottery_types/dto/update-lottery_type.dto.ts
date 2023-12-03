import { PartialType } from '@nestjs/swagger';
import { CreateLotteryTypeDto } from './create-lottery_type.dto';

export class UpdateLotteryTypeDto extends PartialType(CreateLotteryTypeDto) {
    type: number
}
