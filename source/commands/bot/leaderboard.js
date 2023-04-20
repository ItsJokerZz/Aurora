const {
    EmbedBuilder
} = require("discord.js");
const mysql = require('../../handlers/mysql/functions.js');

module.exports = {
    name: "leadboard",
    aliases: ["board"],
    run: async (client, message) => {
        let i = 0;

        mysql.query(`SELECT * FROM ${client.config.mysql.connection.tables.ranking} WHERE guild = '${message.guild.id}' ORDER BY xp DESC LIMIT 10`, (rows) => {

            const embed = new EmbedBuilder()
                .setColor(0x0AA0A0)
                .setTitle("Leaderboard")

            for (const data of rows) {
                i++

                embed.addFields({
                    name: ` `,
                    value: `**${i}**. *<@${data.user}>*\n **XP (Level *${data.level}*)**`,
                    inline: false
                })
            }

            message.channel.send({ embeds: [embed] });
        });
    }
};