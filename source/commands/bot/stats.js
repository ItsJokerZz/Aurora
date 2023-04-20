const {
    EmbedBuilder
} = require("discord.js");
const mysql = require('../../handlers/mysql/functions.js');

module.exports = {
    name: "stats",
    aliases: ["rank", "level"],
    run: async (client, message) => {
        const user = message.mentions.users.first() || message.author;
        
        mysql.query(`SELECT * FROM ${client.config.mysql.connection.tables.ranking} WHERE guild = '${message.guild.id}' AND user = '${user.id}'`, (rows) => {
            if (!rows[0]) return message.channel.send(`${user.tag} has no stats on record.`);

            const XP = rows[0].xp;
            const level = rows[0].level;
            const msgs = rows[0].messages;
            const requiredXP = (level * 50) + ((level * level) * 25);
            const embed = new EmbedBuilder()
                .setColor(0x0AA0A0)
                .setDescription(`**Current Level:** ${level}\n` +
                    `**Current XP:** ${XP}\n` +
                    `**Messages Sent:** ${msgs}\n` +
                    `**XP For Next Level:** ${requiredXP}`);
            message.channel.send({
                embeds: [embed]
            });
        });
    }
}