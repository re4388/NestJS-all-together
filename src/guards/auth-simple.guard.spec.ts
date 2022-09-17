import { AuthSimpleGuard } from './auth-simple.guard';

describe('AuthSimpleGuard', () => {
  it('should be defined', () => {
    expect(new AuthSimpleGuard()).toBeDefined();
  });
});
