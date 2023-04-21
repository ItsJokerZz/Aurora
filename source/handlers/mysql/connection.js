const mysql = require('./functions.js');

module.exports = (client, logging) => {
  const { mysql: mysqlConfig } = client.config;

  logging.newLine('Checking if mySQL is enabled...'.bold, true);

  if (!mysqlConfig.enabled) {
    logging.warn('mySQL is disabled, continuing...'.italic);
    logging.dropDown('(If you are trying to use this feature, check the config.json file.)');
    return;
  }

  logging.success('mySQL is enabled, continuing.');
  logging.newLine('Connecting to mySQL database...'.bold.italic, true);

  if (!mysqlConfig.hideInfo) {
    const { host, port, username, password, database } = mysqlConfig.connection;
    const passwordString = mysqlConfig.hidePass ? '*******' : password;

    logging.dropDown(`Host: ${host}:${port}`);
    logging.dropDown(`Username: ${username}`);
    logging.dropDown(`Password: ${passwordString}`);
    logging.dropDown(`Database: ${database}`);
  }

  mysql.connect((error) => {
    if (error) return logging.error(`MySQL Error: ${error.message}`);
    logging.success('Connected to the MySQL server.', true);
  });

  /* use a connection pool to bypass this issue
   setInterval(() => {
     if (mysql.state === 'disconnected') {
       logging.warn('MySQL: Connection lost, trying to reconnect...');
       mysql.connect((error) => {
         if (error) return logging.error(`MySQL Error: ${error.message}`);
         logging.success('Reconnected to the MySQL server!'.bold);
       });
     }
   }, 1000);
   */
};