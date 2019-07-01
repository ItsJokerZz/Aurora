const Discord = require("discord.js");

module.exports = (client, member, con) => {
    con.query(`SELECT * FROM ${client.config.Config_Table} WHERE guild = '${member.guild.id}'`, (error, rows) => {
        if (error) {
            console.log(error);
        }

        let channel;
        let msg;

        if (rows[0]) {
            if (rows[0].event_channel) {
                channel = member.guild.channels.get(rows[0].event_channel)
            } else {
                channel = member.guild.channels.find(channel => channel.name === "welcome-leave");
            }

            if (rows[0].welcome_msg) {
                msg = rows[0].welcome_msg;

                if (msg.includes("{user}")) {
                    msg = msg.replace('{user}', member.user)
                }

                if (msg.includes("{server}")) {
                    msg = msg.replace('{server}', member.guild.name)
                }
            } else {
                msg = `Welcome ${member.user} to ${member.guild.name}!`;
            }
        } else {
            channel = member.guild.channels.find(channel => channel.name === "welcome-leave");
            msg = `Welcome ${member.user} to ${member.guild.name}!`;
        }

        if (channel) {
            let embed = new Discord.RichEmbed()
                .setColor("0x0AA0A0")
                .setTitle("Member has joined!")
                .setThumbnail(member.user.displayAvatarURL)
                .setDescription(msg)
                .setFooter(`${member.guild.memberCount - member.guild.members.filter(filter => filter.user.bot).size} members`)
                .setTimestamp();
            channel.send(embed);
        }
    })
}