import IBasicBookProperties from "./IBasicBookProperties";
import IBook from "./IBook";

export interface IBookRepository {
    getAllBooks() : Promise<IBasicBookProperties[]>;
    getBookById(id: string) : Promise<IBook | null>;
}