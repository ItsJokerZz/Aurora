const Discord = require('discord.js');

module.exports = (client, message, args, con) => {
    let user = message.mentions.users.first() || message.author;

    con.query(`SELECT * FROM ${client.config.Rank_Table} WHERE guild = '${message.guild.id}' AND id = '${user.id}'`, (error, rows) => {
        if (error) {
            console.log(error);
        }

        if (!rows[0]) {
            if (!args[0]) {
                message.channel.send("You have no stats on record.")
            } else {
                message.channel.send(`${user.displayName} has no stats on record.`)
            }
        } else {
            let sql;
            let XP = rows[0].xp;
            let level = rows[0].level;
            let msgs = rows[0].msgs;
            let requiredXP = (level * 50) + ((level * level) * 25);

            if (XP >= requiredXP) {
                level = (level + 1);
                sql = `UPDATE ${client.config.Rank_Table} SET level = '${level}' WHERE guild = '${message.guild.id}' AND id = '${message.author.id}'`;
                con.query(sql);
            }

            if (user.id == message.author.id) {
                let embed = new Discord.RichEmbed()
                    .setColor("0x0AA0A0")
                    .setTitle("Stats Info")
                    .setDescription(`**Current Level:** ${level}\n` +
                        `**Current XP:** ${XP}\n` +
                        `**Messages Sent:** ${msgs}\n` +
                        `**XP For Next Level:** ${requiredXP}`)
                    .setTimestamp(message.author.presence.activity)
                message.channel.send(embed)
            } else {
                let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
                    .setColor("0x0AA0A0")
                    .setTitle("Stats Info")
                    .setDescription(`**Current Level:** ${level}\n` +
                        `**Current XP:** ${XP}\n` +
                        `**Messages Sent:** ${msgs}\n` +
                        `**XP For Next Level:** ${requiredXP}`)
                    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
                    .setTimestamp(message.author.presence.activity)
                message.channel.send(embed)
            }
        }
    })
}