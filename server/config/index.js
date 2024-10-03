const mysql = require("mysql2");
const dbConfigs = require("./db");
const logger = require("./logger");

const db = mysql.createPool(dbConfigs);

function runQuerySync(query, params) {
  logger.debug("runQuery = " + query);

  const sql = db.format(query, params);
  logger.debug(sql);

  return new Promise((resolve, reject) => {
    db.query(query, params, function (err, results) {
      if (err) {
        logger.error("db_query_failed", sql, err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = { dbInstance: db, runQuerySync };
