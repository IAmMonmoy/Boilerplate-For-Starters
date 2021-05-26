import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import { logStream } from '../utils/logger';
import morgan from 'morgan';
import uuidv1 from 'uuid/v1';

// const addId = (router: Router) => {
//     router.use((req: Request, res: Response, next: NextFunction) => {
//         console.log(req);
//         next();
//     });
//   };

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const addMorganLogging = (router: Router) => {
    router.use(morgan('combined', { stream: logStream }));
  };
