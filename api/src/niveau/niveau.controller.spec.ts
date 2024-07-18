import { Test, TestingModule } from '@nestjs/testing';
import { NiveauController } from './niveau.controller';

describe('NiveauController', () => {
  let controller: NiveauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiveauController],
    }).compile();

    controller = module.get<NiveauController>(NiveauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
