const Discord = require("discord.js")
const ms = require("ms");

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
        let role = message.guild.roles.find(role => role.name === "Muted");

        let embed = new Discord.RichEmbed()
            .setColor("0x0AA0A0")
            .addField("Muted", `${user}`)
            .addField("Muted By", `<@${message.author.id}>`)

        if (!args[0]) {
            message.reply("you must mention a user!");
        } else {
            if (args[0] == message.author) {
                message.reply("you may not mute yourself!");
            } else {
                if (!user) {
                    message.reply("the mentioned user couldn't be found.");
                } else {
                    if (user.hasPermission("ADMINISTRATOR")) {
                        message.reply("you may not mute an admin!");
                    } else {
                        if (!message.member.hasPermission("MUTE_MEMBERS")) {
                            message.reply("you must be able to mute members to use this command!");
                        } else {
                            if (!role) {
                                message.reply(`couldn't find the mute role, use the setup command by using **${prefix}setup**, or created a role called **Muted**.`);
                            } else {
                                if (user.roles.has(role.id)) {
                                    message.reply(`sorry ${user} is already muted!`);
                                } else {
                                    if (args[1]) {
                                        if (args[1].includes("s" || "m" || "h" || "d" || "y")) {
                                            message.reply("the time must be in the followng format: 1s, 1m, ect. If you dont't the user will be muted until unmuted.");

                                            if (channel) {
                                                channel.send(embed);
                                            } else {
                                                let noteEmbed = new Discord.RichEmbed()
                                                    .setColor("0xF00000")
                                                    .setTitle("__PLEASE NOTE__")
                                                    .setDescription(`Logs will be sent in the channel the command was ran in unless you\neither create the channel, use the setup command by using **${prefix}setup**,\nor use the config command for more info on this command use **${prefix}config usage**`)
                                                message.channel.send(noteEmbed);
                                                message.channel.send(embed);
                                            }
                                        } else {
                                            if (args[1]) {
                                                embed.addField("Time Muted For", args[1]);

                                                setTimeout(function () {
                                                    user.removeRole(role.id);

                                                    let embed = new Discord.RichEmbed()
                                                        .setColor("0x0AA0A0")
                                                        .addField("Unmuted", `${user}`)

                                                    if (channel) {
                                                        channel.send(embed);
                                                    } else {
                                                        let noteEmbed = new Discord.RichEmbed()
                                                            .setColor("0xF00000")
                                                            .setTitle("__PLEASE NOTE__")
                                                            .setDescription(`Logs will be sent in the channel the command was ran in unless you\neither create the channel, use the setup command by using **${prefix}setup**,\nor use the config command for more info on this command use **${prefix}config usage**`)
                                                        message.channel.send(noteEmbed);
                                                        message.channel.send(embed);
                                                    }
                                                }, ms(args[1]));
                                            }

                                            if (channel) {
                                                channel.send(embed);
                                            } else {
                                                let noteEmbed = new Discord.RichEmbed()
                                                    .setColor("0xF00000")
                                                    .setTitle("__PLEASE NOTE__")
                                                    .setDescription(`Logs will be sent in the channel the command was ran in unless you\neither create the channel, use the setup command by using **${prefix}setup**,\nor use the config command for more info on this command use **${prefix}config usage**`)
                                                message.channel.send(noteEmbed);
                                                message.channel.send(embed);
                                            }
                                            user.addRole(role.id);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}