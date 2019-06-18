const logger = require('../../Monitor/console-monitor.js');

function generateXp() {
    let max = 30;
    let min = 10;

    return Math.floor(Math.random() * (max - min + 1)) + 10;
}

module.exports = (client, message, con) => {
    con.query(`SELECT * FROM ${client.config.XP_Table} WHERE id = '${message.author.id}'`, (error, rows) => {
        if (error) {
            logger(`${(error)}`, "critical");
        } else {
            let sql;

            if (rows.length < 1) {
                sql = `INSERT INTO ${client.config.XP_Table} (id, xp, msgs) VALUES ('${message.author.id}', ${generateXp()}, '1')`;
            } else {
                let xp = rows[0].xp;
                let msgs = rows[0].msgs + 1;

                sql = `UPDATE ${client.config.XP_Table} SET xp = ${xp + generateXp()}, msgs = '${msgs}' WHERE id = '${message.author.id}'`;
            }
            con.query(sql);
        }
    })
}