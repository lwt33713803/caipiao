import { Test, TestingModule } from '@nestjs/testing';
import { LotteryTypesController } from './lottery_types.controller';
import { LotteryTypesService } from './lottery_types.service';

describe('LotteryTypesController', () => {
  let controller: LotteryTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotteryTypesController],
      providers: [LotteryTypesService],
    }).compile();

    controller = module.get<LotteryTypesController>(LotteryTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
