import "reflect-metadata"
import { inject } from 'inversify';
import { IBookService } from '.';
import BOOK_SERVICE_IDENTIFIER from './constants/identifiers';
import IBasicBookProperties from './interfaces/IBasicBookProperties';
import IBook from './interfaces/IBook';
import { HTTP400Error } from "../../utils/Errors";

export class BookController {

    constructor(@inject(BOOK_SERVICE_IDENTIFIER.IBookService) private bookService: IBookService) { }
    
    public async getAllBooks(): Promise<IBasicBookProperties[]> {
        try {
            return await this.bookService.getAllBooks(); 
        }
        catch(ex) {
            throw ex;
        }
    };

    public async getBookById(bookId: string | null): Promise<IBook> {
        try {
            if(!bookId) throw new HTTP400Error("UserError", "Book id not found");
            return await this.bookService.getBookById(bookId);
        }
        catch(ex) {
            throw ex;
        }
    };
}



