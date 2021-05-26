import { Inject } from "@nestjs/common";
import { BookModel } from "./book.model";
import { BookService } from './book.service';
import { Resolver, Query, Args } from '@nestjs/graphql'

@Resolver(of => BookModel)
export class BookResolver {
  constructor(
    @Inject(BookService) private bookService: BookService,
  ) { }

  @Query(returns => [BookModel])
  async books(): Promise<BookModel[]> {
    return await this.bookService.getBooks();
  }

  @Query(returns => [BookModel])
  async book(@Args('id') id: string): Promise<BookModel[]> {
    return await this.bookService.getBookById(id);
  }
}