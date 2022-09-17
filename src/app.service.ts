import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser(id: number) {
    const users = [
      {
        id: 1,
        name: 'BEN'
      }
    ];
    const user = users.find(x => x.id === id);
    return user || {};
  }
}
