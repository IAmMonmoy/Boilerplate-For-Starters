
import express from 'express';
import https from "https";
import bodyparser from "body-parser";
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { logger, applicationLogger, errorLogger, queryLogger } from "./logger";
import {
  SECURED,
  ENV,
  PORT,
  ROUTE,
  ROUTEv1,
  USEDBPOOL
}
  from './config';

const app = express();
app.use(cors());

import {
  resolvers as resolversv1,
  schema as schemav1
} from './v1/Component';
const moment = require('moment');
const uuidv1 = require('uuid/v1');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.text({ type: 'application/graphql' }));

app.use('/', (req, res, next) => {

  res.startTime = new Date().getTime();
  res.sessionId = uuidv1();

  res.on('finish', function () {
    logger(moment().format("YYYY-MM-DD HH:mm:ss") + ',' + req.originalUrl + ',' + res.sessionId + ',' + String(new Date() - res.startTime));
    queryLogger(moment().format("YYYY-MM-DD HH:mm:ss") + ',' + req.originalUrl + ',' + res.sessionId + ' ' + res.req.body.query);
  });

  next();
});

const server1 = new ApolloServer({
  typeDefs: schemav1,
  resolvers: resolversv1,
  formatError: (err) => {
    let path = "";
    if (err.path) {
      path = err.path.join();
      path = path.replace(/,/g, '/');
    }
    let message = err.message.replace(/,/g, '/');
    errorLogger(moment().format("YYYY-MM-DD HH:mm:ss") + ',' + message + ',' + path + ',' + String(new Date()));
    return {
      message: err.message,
      path: err.path,
      session: ''
    }
  },
  playground: ENV === "development"
});

app.get(ROUTE + "/status", (req, res) => {
  res.send({ status: 'ok' });
});

server1.applyMiddleware({ app, path: ROUTEv1 });

process.setMaxListeners(0);

async function init() {
  try {
    let currentPort = parseInt(process.env.NODE_APP_INSTANCE) + PORT;
    if (SECURED) {
      const server = await https.createServer(app).listen(currentPort, () => {
        console.log(
          `[🚀] API server is ready to accept SSL connections on ${currentPort}`
        );
        applicationLogger(`API server is ready to accept SSL connections on ${currentPort}`);
      });
    } else {
      const server = await app.listen(currentPort, () => {
        console.log(
          `[🚀] API server is ready to accept connections on ${currentPort}`
        );
        applicationLogger(`API server is ready to accept connections on ${currentPort}`);
      });
    }


  } catch (err) {
    console.error("initDB error: " + err.message);
  }
}

init();

