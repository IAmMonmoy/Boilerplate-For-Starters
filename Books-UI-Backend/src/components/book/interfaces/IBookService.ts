import IBasicBookProperties from "./IBasicBookProperties";
import IBook from "./IBook";

export interface IBookService {
    getAllBooks() : Promise<IBasicBookProperties[]>;
    getBookById(id: string) : Promise<IBook>;
}