/* 
add toggle
track xp for ALL messages
keep count of commands ran
AND non-command messages

DO rewards AND leaderboard

etc, etc, etc...

FIGURE OUT why I can't use "sqlConnection"
*/

const mysql = require('./functions.js');
const logging = require('../console-log.js');

module.exports = (client, message) => {
    let data = `SELECT * FROM ${client.config.mysql.connection.tables.ranking} WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;

    mysql.query(data, (rows) => {
        if (rows.length < 1) {
            data = `INSERT INTO ${client.config.mysql.connection.tables.ranking} (guild, user, level, messages, xp) VALUES ('${message.guild.id}', '${message.author.id}', '1', '1', '10')`;
        } else {
            const xp = rows[0].xp;
            const msgs = rows[0].messages + 1;
            const level = rows[0].level;
            
            data = `UPDATE ${client.config.mysql.connection.tables.ranking} SET messages = '${msgs}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;

            if (xp >= level * 50 + level * level * 25) {
                data = `UPDATE ${client.config.mysql.connection.tables.ranking} SET level = '${level + 1}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;
                // mysql.query(data, () => {}) // maybe un-needed
            }

            if (Math.round(Math.random() * 100) <= 100 / 5) {
                data = `UPDATE ${client.config.mysql.connection.tables.ranking} SET xp = ${xp + Math.floor(Math.random() * (25 - 10 + 1)) + 10}, messages = '${msgs}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;
            }
        }

        mysql.query(data, () => {});
    });

    logging.success('RANKING RUNNING');
};