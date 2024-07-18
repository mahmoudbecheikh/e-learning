import { Test, TestingModule } from '@nestjs/testing';
import { FormationService } from './formation.service';

describe('FormationService', () => {
  let service: FormationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormationService],
    }).compile();

    service = module.get<FormationService>(FormationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
