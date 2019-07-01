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

            if (rows[0].leave_msg) {
                msg = rows[0].leave_msg;

                if (msg.includes("{user}")) {
                    msg = msg.replace('{user}', member.user)
                }

                if (msg.includes("{server}")) {
                    msg = msg.replace('{server}', member.guild.name)
                }
            } else {
                msg = `Bye ${member.user} hope you enjoyed your time in ${member.guild.name}!`;
            }
        } else {
            channel = member.guild.channels.find(channel => channel.name === "welcome-leave");
            msg = `Bye ${member.user} hope you enjoyed your time in ${member.guild.name}!`;
        }

        if (channel) {
            let embed = new Discord.RichEmbed()
                .setColor("0x0AA0A0")
                .setTitle("Member has left!")
                .setThumbnail(member.user.displayAvatarURL)
                .setDescription(msg)
                .setFooter(`${member.guild.memberCount - member.guild.members.filter(filter => filter.user.bot).size} members`)
                .setTimestamp();
            channel.send(embed);
        }
    })
}