import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';

@Module({
  imports: [],
  providers: [BookService, BookResolver],
  exports: [BookService]
})
export class BookModule {}
