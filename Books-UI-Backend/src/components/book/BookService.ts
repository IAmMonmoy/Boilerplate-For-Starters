import { inject, injectable } from 'inversify';
import { HTTP400Error } from '../../utils/Errors';
import { IBookRepository } from '.';
import BOOK_SERVICE_IDENTIFIER from './constants/identifiers';
import IBasicBookProperties from './interfaces/IBasicBookProperties';
import IBook from './interfaces/IBook';
import { IBookService } from './interfaces/IBookService';

@injectable()
export class BookService implements IBookService {

   constructor(@inject(BOOK_SERVICE_IDENTIFIER.IBookRepository) private bookRepository: IBookRepository) { }

     public async getAllBooks(): Promise<IBasicBookProperties[]> {
        try {
            return await this.bookRepository.getAllBooks(); 
        }
        catch(ex) {
            throw ex;
        }
    };

    public async getBookById(bookId: string): Promise<IBook> {
        try {
            const book = await this.bookRepository.getBookById(bookId);
            if(!book) throw new HTTP400Error("UserError", "Book Desciption not found");
            return book as IBook; 
        }
        catch(ex) {
            throw ex;
        }
    };
}