import { BookController } from '../BookController';
import { MockBookRepository } from './mocks/MockBookRepository';
import container from '../../../config/ioc_config';
import { IBookRepository } from '../interfaces/IBookRepository';
import BOOK_SERVICE_IDENTIFIER from '../constants/identifiers';
import { IBookService } from '..';
import "reflect-metadata";

describe('BookController tests', () => {
   let controller: BookController;
   beforeEach(() => {
        //provide mock class. although is this case it is unnecessary
        container.unbind(BOOK_SERVICE_IDENTIFIER.IBookRepository)
        container.bind<IBookRepository>(BOOK_SERVICE_IDENTIFIER.IBookRepository).to(MockBookRepository).inSingletonScope();
        const service = container.get<IBookService>(BOOK_SERVICE_IDENTIFIER.IBookService);
        controller = new BookController(service);
   });

  it('It should return all books', async () => {
    expect(await controller.getAllBooks()).toEqual(await new MockBookRepository().getAllBooks());
  });

  it('It should return specific book', async () => {
    expect(await controller.getBookById("378bd73a-bb2d-11eb-8529-0242ac130003")).toEqual(await new MockBookRepository().getBookById("378bd73a-bb2d-11eb-8529-0242ac130003"));
  });
  
  it('It should throw error if book details not found', async () => {
    expect(controller.getBookById("asdf")).rejects.toThrow(Error);
  });

});