import supertest from 'supertest';
import app from '../../../server';
import { BookController } from '../BookController';
import { MockBookRepository } from './mocks/MockBookRepository';
import container from '../../../config/ioc_config';
import { IBookRepository } from '../interfaces/IBookRepository';
import BOOK_SERVICE_IDENTIFIER from '../constants/identifiers';
import { IBookService } from '..';
import "reflect-metadata";

describe('Full API Test', () => {
    const request = supertest(app);
    beforeEach(() => {
        container.unbind(BOOK_SERVICE_IDENTIFIER.IBookRepository)
        container.bind<IBookRepository>(BOOK_SERVICE_IDENTIFIER.IBookRepository).to(MockBookRepository).inSingletonScope();
    });

    it('It should return with status 200 for all books', async () => {
        const response = await request
            .get('/api/v1/books')
            ;
        expect(response.status).toBe(200);
    });

    it('It should return with status 200 for one book', async () => {
        const response = await request
            .get('/api/v1/book?id=378bd73a-bb2d-11eb-8529-0242ac130003')
            ;
        expect(response.status).toBe(200);
    });

    it('It should return with status 400 for not finding book', async () => {
        const response = await request
            .get('/api/v1/book?id=778bd73a-bb2d-11eb-8529-0242ac130003')
            ;
        expect(response.status).toBe(400);
    });

})