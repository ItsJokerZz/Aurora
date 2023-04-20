const mySQL = require("mysql")

module.exports = (client, logging) => {
    var mysql = mySQL.createConnection({
        host: client.config.mysql.connection.host,
        port: client.config.mysql.connection.port,
        user: client.config.mysql.connection.username,
        password: client.config.mysql.connection.password,
        database: client.config.mysql.connection.database,
    })

    module.exports.connect = function () {
        mysql.connect((error) => {
            if (error) return logging.error(`MySQL Error: ${error.message}`)
            logging.success("Connected to the MySQL server.", true)
        })
    }

    module.exports.query = function (query, callback) {
        mysql.query(query, (error, rows) => {
            if (error) return logging.error(`MySQL Error: ${error.message}`)
            return callback(rows)
        })
    }

    require("./connection.js")(client, logging);
}