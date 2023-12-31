import { Test, TestingModule } from '@nestjs/testing';
import { CommisionController } from './commision.controller';
import { CommisionService } from './commision.service';

describe('CommisionController', () => {
  let controller: CommisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommisionController],
      providers: [CommisionService],
    }).compile();

    controller = module.get<CommisionController>(CommisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
