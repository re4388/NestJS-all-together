import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerTodoService } from './swagger-todo.service';

describe('SwaggerTodoService', () => {
  let service: SwaggerTodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwaggerTodoService],
    }).compile();

    service = module.get<SwaggerTodoService>(SwaggerTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
