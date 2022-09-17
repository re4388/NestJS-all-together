import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { BookService } from './book.service';

@Module({
  imports: [
    StorageModule
  ],
  providers: [
    BookService
  ],
  exports: [
    BookService
  ]
})
export class BookModule { }