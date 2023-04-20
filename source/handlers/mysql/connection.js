const mysql = require('./functions.js');

module.exports = (client, logging) => {
  logging.newLine('Checking if mySQL is enabled...'.bold, true);

  if (client.config.mysql.enabled) {
    logging.success('mySQL is enabled, continuing.');
    logging.newLine('Connecting to mySQL database...'.bold.italic, true);

    if (!client.config.mysql.hideInfo) {
      logging.dropDown(`Host: ${client.config.mysql.connection.host}:${client.config.mysql.connection.port}`);
      logging.dropDown(`Username: ${client.config.mysql.connection.username}`);

      if (!client.config.mysql.hidePass) {
        logging.dropDown(`Password: ${client.config.mysql.connection.password}`);
      } else {
        logging.dropDown('Password: *******');
      }

      logging.dropDown(`Database: ${client.config.mysql.connection.database}`);
    }

    mysql.connect((error) => {
      if (error) {
        return logging.error(`MySQL Error: ${error.message}`);
      }

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

  } else {
    // implement toggle
    logging.warn('mySQL is disabled, continuing...'.italic);
    logging.dropDown('(If you are trying to use this feature, check the config.json file.)');
  }
};