import { IBookRepository } from '../../interfaces/IBookRepository';
import { injectable } from 'inversify';
import IBook from '../../interfaces/IBook';
import IBasicBookProperties from '../../interfaces/IBasicBookProperties';

@injectable()
export class MockBookRepository implements IBookRepository {
    
    private booksListWithDesciption: IBook[] = [
        {bookId: '32e959aa-bb2d-11eb-8529-0242ac130003', title: 'The Door in the Wall', year: 1989, description: 'A crippled boy in fourteenth-century England proves his courage and earns recognition from the King.'},
        {bookId: '378bd73a-bb2d-11eb-8529-0242ac130003', title: 'Amos Fortune, Free Man', year: 1989, description: 'The life of the eighteenth-century African prince who, after being captured by slave traders, was brought to Massachusetts where he was a slave until he was able to buy his freedom at the age of sixty.'},
        {bookId: '3d634b02-bb2d-11eb-8529-0242ac130003', title: 'The Hobbit, Or, There and Back Again', year: 1989, description: 'Bilbo Baggins, a respectable, well-to-do hobbit, lives comfortably in his hobbit-hole until the day the wandering wizard Gandalf chooses him to take part in an adventure from which he may never return..'},
    ];

    private bookList : IBasicBookProperties[]  = [
        {bookId: '32e959aa-bb2d-11eb-8529-0242ac130003', title: 'The Door in the Wall', year: 1989},
        {bookId: '378bd73a-bb2d-11eb-8529-0242ac130003', title: 'Amos Fortune, Free Man', year: 1950},
        {bookId: '3d634b02-bb2d-11eb-8529-0242ac130003', title: 'The Hobbit, Or, There and Back Again', year: 2012},
    ];

    async getAllBooks(): Promise<IBasicBookProperties[]> {
        return Promise.resolve(this.bookList);
    }
    
    async getBookById(id: string) : Promise<IBook | null> {
        const book : IBook[] = this.booksListWithDesciption.filter(books => books.bookId === id);
        return Promise.resolve(book.length ? book[0] : null);
    }

}
