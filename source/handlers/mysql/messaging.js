const mysql = require('./functions.js');

module.exports = (client, message) => {
    const {
        guild,
        author
    } = message;

    const data = `SELECT * FROM ${client.config.mysql.connection.tables.ranking} WHERE guild = '${guild.id}' AND user = '${author.id}'`;

    mysql.query(data, (rows) => {
        const xp = rows.length ? rows[0].xp : 0;
        const msgs = rows.length ? rows[0].messages + 1 : 1;
        const level = rows.length ? rows[0].level : 1;
        const xpNeeded = level * 50 + level * level * 25;

        let query = `INSERT INTO ${client.config.mysql.connection.tables.ranking} (guild, user, level, messages, xp) VALUES ('${guild.id}', '${author.id}', '1', '1', '10')`;

        if (rows.length) {
            query = `UPDATE ${client.config.mysql.connection.tables.ranking} SET messages = '${msgs}' WHERE guild = '${guild.id}' AND user = '${author.id}'`;

            if (xp >= xpNeeded)
                query = `UPDATE ${client.config.mysql.connection.tables.ranking} SET level = '${level + 1}' WHERE guild = '${guild.id}' AND user = '${author.id}'`;

            if (Math.round(Math.random() * 100) <= 20) {
                const randomXp = Math.floor(Math.random() * 16) + 10;
                query = `UPDATE ${client.config.mysql.connection.tables.ranking} SET xp = ${xp + randomXp}, messages = '${msgs}' WHERE guild = '${guild.id}' AND user = '${author.id}'`;
            }
        }

        mysql.query(query, () => {});
    });
};