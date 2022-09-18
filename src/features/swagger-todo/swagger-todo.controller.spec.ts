import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerTodoController } from './swagger-todo.controller';

describe('SwaggerTodoController', () => {
  let controller: SwaggerTodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwaggerTodoController],
    }).compile();

    controller = module.get<SwaggerTodoController>(SwaggerTodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
