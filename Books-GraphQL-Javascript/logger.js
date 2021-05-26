var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
	filename: 'log/access/access-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '7d'
});

var transport2 = new (winston.transports.DailyRotateFile)({
	filename: 'log/error/error-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d'
});

var transport3 = new (winston.transports.DailyRotateFile)({
	filename: 'log/application/application-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d'
});

var transport4 = new (winston.transports.DailyRotateFile)({
	filename: 'log/queryLogger/query-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d'
});

var accessLogger = winston.createLogger({
	transports: [
		transport
	]
});

var errLogger = winston.createLogger({
	transports: [
		transport2
	]
});

var appLogger = winston.createLogger({
	transports: [
		transport3
	]
});

var qLogger = winston.createLogger({
	transports: [
		transport4
	]
});

const logger = (msg) => {
	accessLogger.info(msg);
};

const errorLogger = (msg) => {
	errLogger.error(msg);
};

const applicationLogger = (msg) => {
	appLogger.info(msg);
};

const queryLogger = (msg) => {
	qLogger.info(msg);
};

module.exports = {logger, errorLogger, applicationLogger, queryLogger}