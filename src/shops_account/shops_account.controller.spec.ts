import { Test, TestingModule } from '@nestjs/testing';
import { ShopsAccountController } from './shops_account.controller';
import { ShopsAccountService } from './shops_account.service';

describe('ShopsAccountController', () => {
  let controller: ShopsAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsAccountController],
      providers: [ShopsAccountService],
    }).compile();

    controller = module.get<ShopsAccountController>(ShopsAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
