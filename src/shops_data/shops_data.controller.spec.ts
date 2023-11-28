import { Test, TestingModule } from '@nestjs/testing';
import { ShopsDataController } from './shops_data.controller';
import { ShopsDataService } from './shops_data.service';

describe('ShopsDataController', () => {
  let controller: ShopsDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsDataController],
      providers: [ShopsDataService],
    }).compile();

    controller = module.get<ShopsDataController>(ShopsDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
