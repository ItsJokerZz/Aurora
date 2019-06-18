const chalk = require('chalk');

module.exports = (client) => {
    console.log(`${client.config.botName} has ${chalk.red("disconnected")}, attemping to reconnect...`)
}