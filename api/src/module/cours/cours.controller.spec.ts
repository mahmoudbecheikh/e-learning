import { Test, TestingModule } from '@nestjs/testing';
import { CoursController } from './cours.controller';
import { CoursService } from './cours.service';

describe('CoursController', () => {
  let controller: CoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursController],
      providers: [CoursService],
    }).compile();

    controller = module.get<CoursController>(CoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
