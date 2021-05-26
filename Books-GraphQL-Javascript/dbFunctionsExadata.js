var oracledb = require('oracledb');
import { logger, errorLogger } from './logger';
import { USEDBPOOL, DBNAME, USEDIRCON } from './config';
import { getDBObject, dbConf } from '../globalFunctions/globalVariables';

const executeDbProcExadata = async (OracleQry, bindVars, maxRows) => {
  if (USEDIRCON) {
    return await executeDbProcUsingDirect(OracleQry, bindVars, maxRows);
  }
  else {
    return await executeDbProcUsingPool(OracleQry, bindVars, maxRows);
  }
}

const executeDbProcUsingDirect = async (OracleQry, bindVars, maxRows) => {

  let selectedDb = await getDBObject(dbConf.exadata);

  return oracledb.getConnection({
    user: selectedDb.user,
    password: selectedDb.password,
    connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=' + selectedDb.host + ')(PORT=' + selectedDb.port + '))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=' + selectedDb.dbname + ')))'
  })
    .then(function (connection) {
      return connection.execute(OracleQry, bindVars, { resultSet: false, maxRows: maxRows })
        .then(function (result) {
          connection.close();
          if (maxRows === 1) {
            return result.rows[0];
          }
          else {
            return result.rows;
          }
        })
        .catch(function (err) {
          connection.close();
          throw err;
        });
    }).catch(function (err) {
      throw err;
    });

};

const executeDbProcUsingPool = async (OracleQry, bindVars, maxRows) => {
  let connection;

  try {
    var pool = await oracledb.getPool(dbConf.exadata);
    connection = await pool.getConnection();

    let result = await connection.execute(OracleQry, bindVars, { resultSet: false, maxRows: maxRows });

    if (maxRows === 1) {
      return result.rows[0];
    }
    else {
      return result.rows;
    }

  }
  catch (ex) {
    throw (ex);
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        throw (err);
      }
    }
  }
}


module.exports = { executeDbProcExadata }