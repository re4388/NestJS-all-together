import { Injectable } from '@nestjs/common';
import { BookService } from './common/book/book.service';
import { StorageService } from './common/storage/storage.service';


// 為每個請求建立全新的實例，在該請求中的 Provider 是共享實例的，請求結束後將會進行垃圾回收
// @Injectable({ scope: Scope.REQUEST })
@Injectable()
export class AppService {
  constructor(
    private readonly bookService: BookService,
    private readonly storage: StorageService
  ) {
    console.log(`AppService: ${Math.random()}`);
  }


  public addBookToStorage(book: any): void {
    this.storage.addItem(book);
  }

  public addBookToBookStorage(book: any): void {
    this.bookService.addBook(book);
  }

  public getStorageList(): any[] {
    return this.storage.getItems();
  }

  public getBookList(): any[] {
    return this.bookService.getBooks();
  }

  getHello(): string {
    return 'Hello World!';
  }

  // getUser(id: number) {
  //   const users = [
  //     {
  //       id: 1,
  //       name: 'BEN'
  //     }
  //   ];
  //   const user = users.find(x => x.id === id);
  //   return user || {};
  // }
}
