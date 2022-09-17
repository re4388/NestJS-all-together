import { HelloWorldInterceptor } from './hello-world.interceptor';

describe('HelloWorldInterceptor', () => {
  it('should be defined', () => {
    expect(new HelloWorldInterceptor()).toBeDefined();
  });
});
