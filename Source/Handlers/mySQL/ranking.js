const logger = require('../../Monitor/console-monitor.js');

module.exports = (client, message, con) => {
    con.query(`SELECT * FROM ${client.config.Rank_Table} WHERE guild = '${message.guild.id}' AND id = '${message.author.id}'`, (error, rows) => {
        if (error) {
            console.log(error);
        } else {
            let sql;

            if (rows.length < 1) {
                sql = `INSERT INTO ${client.config.Rank_Table} (guild, id, xp, level, msgs) VALUES ('${message.guild.id}', '${message.author.id}', '10', '1', '1')`;
            } else {
                let xp = rows[0].xp;
                let msgs = rows[0].msgs + 1;

                sql = `UPDATE ${client.config.Rank_Table} SET msgs = '${msgs}' WHERE guild = '${message.guild.id}' AND id = '${message.author.id}'`;

                function randXP() {
                    let max = 25;
                    let min = 10;

                    return Math.floor(Math.random() * (max - min + 1)) + 10;
                }

                let chance = Math.round(Math.random() * 100);

                if (chance <= 100 / 5) {
                    sql = `UPDATE ${client.config.Rank_Table} SET xp = ${xp + randXP()}, msgs = '${msgs}' WHERE guild = '${message.guild.id}' AND id = '${message.author.id}'`;
                }
            }
            con.query(sql);
        }
    })
}