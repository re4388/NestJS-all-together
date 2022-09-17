import { HelloWorldMiddleware } from './hello-world.middleware';

describe('HelloWorldMiddleware', () => {
  it('should be defined', () => {
    expect(new HelloWorldMiddleware()).toBeDefined();
  });
});
