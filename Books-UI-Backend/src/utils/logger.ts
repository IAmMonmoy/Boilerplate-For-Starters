
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const accessTransport = new (DailyRotateFile)({
    filename: 'log/access/access-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
});

const errorTransport = new (DailyRotateFile)({
    filename: 'log/error/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const accessLogger = winston.createLogger({
    transports: [
        accessTransport,
    ],
});

const errLogger = winston.createLogger({
    transports: [
        errorTransport,
    ],
});

const logger = (msg: any) => {
    accessLogger.info(msg);
};

const errorLogger = (msg: any) => {
    errLogger.error(msg);
};

const logStream = {
    write: (text: string) => {
        accessLogger.info(text);
    },
};

export { logger, errorLogger, logStream };
