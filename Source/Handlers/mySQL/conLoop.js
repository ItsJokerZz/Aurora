const logger = require('../../Monitor/console-monitor.js');

module.exports = (client, con) => {
    setInterval(() => {
        con.query(`SELECT * FROM ${client.config.Loop_Table} WHERE 1`, (error, rows) => {
            if (error) {
                console.log(error);
            } else {
                let loop;
                let time = rows[0].time + 10;

                loop = `UPDATE ${client.config.Loop_Table} SET time = ${time} WHERE 1`;
                con.query(loop);
            }
        })
    }, 600000);
}