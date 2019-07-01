const chalk = require('chalk');
const logger = require('../../Monitor/console-monitor.js');

module.exports = (con) => {
    con.connect(error => {
        if (error) {
            console.log(error);
        } else {
            logger(`${chalk.green("Successfully ") + "connected to mySQL database.\n"}`, "default")
        }
    });
}