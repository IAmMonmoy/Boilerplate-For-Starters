var oracledb = require('oracledb');
import { logger, errorLogger } from './logger';
import { USEDBPOOL, DBNAME, USEDIRCON } from './config';
import { initDBSequelize } from './dbSetup';
import { getDBObject } from '../globalFunctions/globalVariables';


const executeDbProc = async (OracleQry, bindVars, maxRows) => {
  if (USEDIRCON) {
    return await executeDbProcUsingDirect(OracleQry, bindVars, maxRows);
  }
  else {
    if (USEDBPOOL) {
      return await executeDbProcUsingPool(OracleQry, bindVars, maxRows);
    }
    else {
      var res = await executeDbProcUsingSequ(OracleQry, bindVars, maxRows);
      return res;
    }
  }
}

const executeDbProcUsingPool = async (OracleQry, bindVars, maxRows) => {
  let connection;

  try {
    var pool = await oracledb.getPool(DBNAME);
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

const executeDbProcUsingSequ = async (OracleQry, bindVars, maxRows) => {
  let returnResult;
  let db = await initDBSequelize();
  try {
    await db.query(OracleQry,
      { replacements: bindVars, type: db.QueryTypes.SELECT, maxRows: maxRows }
    ).then(function (result) {
      if (maxRows === 1) {

        returnResult = result[0];
      }
      else {
        returnResult = result;
      }
    }).catch(function (err) {
      throw (err);
    });
  }
  catch (err) {
    throw (err);
  }
  return returnResult;
}

const executeDbProcUsingDirect = async (OracleQry, bindVars, maxRows) => {

  let selectedDb = await getDBObject(DBNAME);

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

module.exports = { executeDbProc }