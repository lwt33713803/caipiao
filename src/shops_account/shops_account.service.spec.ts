import { Test, TestingModule } from '@nestjs/testing';
import { ShopsAccountService } from './shops_account.service';

describe('ShopsAccountService', () => {
  let service: ShopsAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsAccountService],
    }).compile();

    service = module.get<ShopsAccountService>(ShopsAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
