import { IsNotEmpty, Validate, IsInt } from 'class-validator';
import BaseObject from '../../../globalEntities/BaseObject';
import { CustomDateCheck } from '../../../utils/customValidators';
import IBook from '../interfaces/IBook';

export default class Book implements IBook {
    private _bookId: string;
    private _title: string;
    private _year: number;
    private _description: string;

    public get bookId() {
        return this._bookId;
    }

    public get title() {
        return this._title;
    }

    public get year() {
        return this._year;
    }

    public get description() {
        return this._description;
    }

    constructor(bookId: string, title: string, year: number, description: string) {
        this._bookId = bookId;
        this._title = title;
        this._year = year;
        this._description = description;
    }
}
