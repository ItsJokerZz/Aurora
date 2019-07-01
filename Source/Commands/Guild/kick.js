const Discord = require("discord.js")

module.exports = (client, message, args, con, prefix) => {
    con.query(`SELECT * FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`, (error, rows) => {
        if (error) {
            console.log(error);
        }

        let channel;

        if (rows[0]) {
            if (rows[0].log_channel) {
                channel = message.guild.channels.get(rows[0].log_channel)
            } else {
                channel = message.guild.channels.find(channel => channel.name === "logs");
            }
        }

        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let reason = args.join(" ").slice(22);

        if (!args[0]) {
            message.reply("you must mention a user!");
        } else {
            if (args[0] == message.author) {
                message.reply("you may not kick yourself!");
            } else {
                if (!user) {
                    message.reply("the mentioned user couldn't be found.");
                } else {
                    if (user.hasPermission("ADMINISTRATOR")) {
                        message.reply("you may not kick an admin!");
                    } else {
                        if (!message.member.hasPermission("KICK_MEMBERS")) {
                            message.reply("you must be able to kick members to use this command!");
                        } else {
                            if (!args[1]) {
                                message.reply("you must include a reason.");
                            } else {
                                let embed = new Discord.RichEmbed()
                                    .setColor("0x0AA0A0")
                                    .addField("Kicked", `${user}`)
                                    .addField("Kicked By", `<@${message.author.id}>`)
                                    .addField("Reason", reason);

                                if (channel) {
                                    channel.send(embed);
                                } else {
                                    let noteEmbed = new Discord.RichEmbed()
                                        .setColor("0xF00000")
                                        .setTitle("__PLEASE NOTE__")
                                        .setDescription(`Logs will be sent in the channel the command was ran in unless you\neither create the channel, use the setup command by using **${prefix}setup**,\nor use the config command for more info on this command use **${prefix}config usage**`)
                                    message.channel.send(noteEmbed)
                                    message.channel.send(embed)
                                }
                                message.guild.member(user).kick(reason);
                            }
                        }
                    }
                }
            }
        }
    })
}