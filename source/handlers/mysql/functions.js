const mySQL = require("mysql");

module.exports = (client, logging) => {
  const { mysql: mysqlConfig } = client.config;
  const { host, port, username, password, database } = mysqlConfig.connection;
  const mysql = mySQL.createConnection({ host, port, user: username, password, database });

  function connect() {
    mysql.connect((error) => {
      if (error) return logging.error(`MySQL Error: ${error.message}`);
      logging.success("Connected to the MySQL server.", true);
    });
  }

  function query(sql, callback) {
    mysql.query(sql, (error, rows) => {
      if (error) return logging.error(`MySQL Error: ${error.message}`);
      return callback(rows);
    });
  }

  module.exports = { connect, query };
  require("./connection.js")(client, logging);
};
