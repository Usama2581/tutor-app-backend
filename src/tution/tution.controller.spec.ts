import { Test, TestingModule } from '@nestjs/testing';
import { TutionController } from './tution.controller';
import { TutionService } from './tution.service';

describe('TutionController', () => {
  let controller: TutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutionController],
      providers: [TutionService],
    }).compile();

    controller = module.get<TutionController>(TutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
