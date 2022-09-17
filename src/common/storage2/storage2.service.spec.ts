import { Test, TestingModule } from '@nestjs/testing';
import { Storage2Service } from './storage2.service';

describe('Storage2Service', () => {
  let service: Storage2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Storage2Service],
    }).compile();

    service = module.get<Storage2Service>(Storage2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
