import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import DIContainer from '../../config/ioc_config';
import BOOK_SERVICE_IDENTIFIER from './constants/identifiers';
import { IBookService } from './index';
import { BookController } from './BookController';
import { ApplicationResponse } from '../../utils/Errors';

export default [
  {
    path: '/api/v1/books',
    method: 'get',
    handler: [
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const service = DIContainer.get<IBookService>(BOOK_SERVICE_IDENTIFIER.IBookService);
            const bookController = new BookController(service);
            const books = await bookController.getAllBooks();
            res.status(200).send(new ApplicationResponse(books));
          } catch (ex) {
            next(ex);
          }
        },
      ],
  },
  {
    path: '/api/v1/book/',
    method: 'get',
    handler: [
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const id = req.query.id as string;
            const service = DIContainer.get<IBookService>(BOOK_SERVICE_IDENTIFIER.IBookService);
            const bookController = new BookController(service);
            const book = await bookController.getBookById(id);
            res.status(200).send(new ApplicationResponse([book]));
          } catch (ex) {
            next(ex);
          }
        },
      ],
  },
];
