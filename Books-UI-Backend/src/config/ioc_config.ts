import { Container } from 'inversify';
import { IBookRepository, IBookService, BookRepository, BookService, 
        BOOK_SERVICE_IDENTIFIER } from '../components/book';

const DIContainer = new Container();
DIContainer.bind<IBookRepository>(BOOK_SERVICE_IDENTIFIER.IBookRepository).to(BookRepository).inSingletonScope();
DIContainer.bind<IBookService>(BOOK_SERVICE_IDENTIFIER.IBookService).to(BookService).inSingletonScope();

export default DIContainer;
