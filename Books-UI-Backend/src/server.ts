import 'reflect-metadata';
import './utils/envConfig';
import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import routes from './components';
import middleware from './middleware';
import { clientError } from './middleware/errorHandler';

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware([clientError], router);
const { PORT = 9999 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);

export default server;