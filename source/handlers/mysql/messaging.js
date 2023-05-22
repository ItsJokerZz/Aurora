// add global leaderboards and rewards
const mysql = require('./functions.js');

module.exports = (client, message) => {
    let data = `SELECT * FROM ${client.config.mysql.connection.tables.ranking} WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;

    mysql.query(data, (rows) => {
        if (config.client.mysql.ranking.guild && rows.length < 1)
            data = `INSERT INTO ${client.config.mysql.connection.tables.ranking} (guild, user, level, xp, messages, rewards) VALUES ('${message.guild.id}', '${message.author.id}', '1', '10', '1', ${null})`;
        else {
            const xp = rows[0].xp;
            const msgs = rows[0].messages + 1;
            const level = rows[0].level;
            const rewards = rows[0].rewards

            const chance = 30; // save globably and per guild
            const successRate = Math.round(Math.random() * 100);
            const requiredXP = (level * 50) + ((level * level) * 25);

            const randomXP = function (min = 10, max = 35) {
                return Math.floor(Math.random() * (max - min + 1) + 10);
            }

            data = `UPDATE ${client.config.mysql.connection.tables.ranking} SET messages = '${msgs}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;
            if (xp >= requiredXP) data = `UPDATE ${client.config.mysql.connection.tables.ranking} SET level = '${level + 1}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;
            if (successRate >= chance) data = `UPDATE ${client.config.mysql.connection.tables.ranking} SET xp = ${xp + randomXP()}, messages = '${msgs}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`;
        }

        mysql.query(data, () => {});
    });

    mysql.query(data, () => {});
};