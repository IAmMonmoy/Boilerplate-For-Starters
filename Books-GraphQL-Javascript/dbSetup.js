const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.NUMBER];
import { applicationLogger } from "./logger";
import Sequelize from 'sequelize-oracle';
import { getDBObject, dbConf } from '../globalFunctions/globalVariables';
import { DBNAME } from './config';

const initDBSequelize = async () => {
  var DbConnection;
  let selectedDb = await getDBObject(DBNAME);
  DbConnection = new Sequelize(selectedDb.dbname, selectedDb.user, selectedDb.password, {
    host: selectedDb.host,
    port: selectedDb.port,
    dialect: selectedDb.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 5000,
      acquire: 10000
    }
  });
  return DbConnection;
}
const initDBPool = async () => {
  let selectedDb = await getDBObject(DBNAME);
  oracledb.createPool({
    poolAlias: DBNAME
    , user: selectedDb.user
    , password: selectedDb.password
    , connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=' + selectedDb.host + ')(PORT=' + selectedDb.port + '))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=' + selectedDb.dbname + ')))'
    , queueRequests: true
    , poolMin: 1
    , poolMax: 2
    , poolIncrement: 1
    , poolTimeout: 10
    , queueTimeout: 10000
    , poolPingInterval: 10
    , stmtCacheSize: 30
  });
}

const initExadataPool = async () => {
  let selectedDb = await getDBObject(dbConf.exadata);
  oracledb.createPool({
    poolAlias: dbConf.exadata
    , user: selectedDb.user
    , password: selectedDb.password
    , connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=' + selectedDb.host + ')(PORT=' + selectedDb.port + '))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=' + selectedDb.dbname + ')))'
    , queueRequests: true
    , poolMin: 1
    , poolMax: 2
    , poolIncrement: 1
    , poolTimeout: 10
    , queueTimeout: 10000
    , poolPingInterval: 10
    , stmtCacheSize: 30
  });
}
const closePoolAndExit = async () => {
  try {
    oracledb.getPool(DBNAME).close(3).then((result) => {
      return {};
    }).catch((err) => {
      return {};
      //reject();
    });

    oracledb.getPool(dbConf.exadata).close(3).then((result) => {
      return {};
    }).catch((err) => {
      return {};
      //reject();
    });

  } catch (err) {
    //console.error("closePoolAndExit: " + err.message);
    applicationLogger("closePoolAndExit: " + err.message);
    process.exit(1);
  }
}


module.exports = { initDBSequelize, initDBPool, initExadataPool, closePoolAndExit }


