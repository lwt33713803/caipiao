import { Test, TestingModule } from '@nestjs/testing';
import { ShopsDataService } from './shops_data.service';

describe('ShopsDataService', () => {
  let service: ShopsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsDataService],
    }).compile();

    service = module.get<ShopsDataService>(ShopsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
