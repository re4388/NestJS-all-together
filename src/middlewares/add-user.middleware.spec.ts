import { AddUserMiddleware } from './add-user.middleware';

describe('AddUserMiddleware', () => {
  it('should be defined', () => {
    expect(new AddUserMiddleware()).toBeDefined();
  });
});
