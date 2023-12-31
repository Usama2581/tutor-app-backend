import { Test, TestingModule } from '@nestjs/testing';
import { TutionService } from './tution.service';

describe('TutionService', () => {
  let service: TutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutionService],
    }).compile();

    service = module.get<TutionService>(TutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
