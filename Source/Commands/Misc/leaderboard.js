const Discord = require('discord.js');

module.exports = (client, message, args, con) => {
    con.query(`SELECT * FROM ${client.config.Rank_Table} WHERE guild = '${message.guild.id}' ORDER BY xp DESC LIMIT 10`, function (error, result) {
        if (error) {
            console.log(error);
        }
        let embed = new Discord.RichEmbed()
            .setTitle("Leaderboard")
            .setColor("0x0AA0A0")
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
            .setTimestamp(message.author.presence.activity)

        for (const data of result) {
            embed.addField(client.users.get(data.id).tag, `${data.xp} XP (Level ${data.level})`);
        }
        message.channel.send(embed)
    })
}