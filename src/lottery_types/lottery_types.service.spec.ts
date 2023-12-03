import { Test, TestingModule } from '@nestjs/testing';
import { LotteryTypesService } from './lottery_types.service';

describe('LotteryTypesService', () => {
  let service: LotteryTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotteryTypesService],
    }).compile();

    service = module.get<LotteryTypesService>(LotteryTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
