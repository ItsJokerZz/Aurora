const Discord = require("discord.js");

module.exports = (client, message, args, con, prefix) => {
    con.query(`SELECT * FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`, (error, rows) => {
        if (error) {
            console.log(error);
        }

        let sqlPrefix;
        let logChannel;
        let eventChannel;
        let welcomeMsg;
        let leaveMsg;
        let description;

        let msg = args.slice(2).join(" ");

        let sql;

        if (!rows[0]) {
            description = "**Logging Channel:** None\n" +
                "**Welcome Message:** None\n" +
                "**Leave Message:** None\n" +
                "**User Events Channel:** None";
        } else {
            sqlPrefix = rows[0].prefix;
            logChannel = rows[0].log_channel;
            eventChannel = rows[0].event_channel;
            welcomeMsg = rows[0].welcome_msg;
            leaveMsg = rows[0].leave_msg;

            if (!logChannel) {
                description = "**Logging Channel:** None\n";
            } else {
                description = `**Logging Channel:** <#${logChannel}>\n`;
            }

            if (!eventChannel) {
                description = description + "**User Events Channel:** None\n";
            } else {
                description = description + `**User Events Channel:** <#${eventChannel}>\n`;
            }

            if (!welcomeMsg) {
                description = description + "**Welcome Message:** None\n";
            } else {
                description = description + `**Welcome Message:** ${welcomeMsg}\n`;
            }

            if (!leaveMsg) {
                description = description + "**Leave Message:** None\n";
            } else {
                description = description + `**Leave Message:** ${leaveMsg}\n`;
            }
        }

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.reply("you must be an admin to use this command!");
        } else {
            if (args[0] == "usage") {
                let embed = new Discord.RichEmbed()
                    .setColor("0x0AA0A0")
                    .addField("Usages", `${prefix}config set prefix <prefix>\n` +
                        `${prefix}config set logChannel <channel>\n` +
                        `${prefix}config set eventChannel <channel>\n` +
                        `${prefix}config set welcomeMsg <message>\n` +
                        `${prefix}config set leaveMsg <message>\n\n` +
                        `${prefix}config reset prefix\n` +
                        `${prefix}config reset logChannel\n` +
                        `${prefix}config reset eventChannel\n` +
                        `${prefix}config reset welcomeMsg\n` +
                        `${prefix}config reset leaveMsg\n\n` +
                        `${prefix}config clear\n`, true)
                    .addField("Examples", `${prefix}config set prefix !\n` +
                        `${prefix}config set logChannel #logs\n` +
                        `${prefix}config set eventChannel #welcome-leave\n` +
                        `${prefix}config set welcomemsg Hello {user} and welcome to {server}!\n` +
                        `${prefix}config set leavemsg Bye {user}! We hope you enjoyed yor time in {server}\n`, true)
                    .setFooter("Please note when using {user} and {server} in the welcome and leave messages it will display the user's name and your server name instead of just {user} and {server}.")
                message.channel.send(embed);
            } else {
                if (!args[0]) {
                    let embed = new Discord.RichEmbed()
                        .setColor("0x0AA0A0")
                        .setTitle(`${message.guild.name}'s Config`)
                        .setDescription(description)
                    message.channel.send(embed);
                } else {
                    if (args[0] == "set") {
                        if (!args[1]) {
                            let embed = new Discord.RichEmbed()
                                .setTitle("Error Performing Command")
                                .setColor("0xF00000")
                                .addField("Reason", "Missing Argument")
                                .addField("Usages", `${prefix}config set prefix <prefix>\n` +
                                    `${prefix}config set logChannel <channel>\n` +
                                    `${prefix}config set eventChannel <channel>\n` +
                                    `${prefix}config set welcomemsg <message>\n` +
                                    `${prefix}config set leavemsg <message>`, true)
                                .addField("Examples", `${prefix}config set prefix !\n` +
                                    `${prefix}config set logChannel #logs\n` +
                                    `${prefix}config set eventChannel #welcome-leave\n` +
                                    `${prefix}config set welcomemsg Hello {user} and welcome to {server}!\n` +
                                    `${prefix}config set leavemsg Bye {user}! We hope you enjoyed yor time in {server}\n`, true)
                                .setFooter("Please note when using {user} and {server} in the welcome and leave messages it will display the user's name and your server name instead of just {user} and {server}.")
                            message.channel.send(embed);
                        } else {
                            if (args[1] == "prefix") {
                                if (!args[2]) {
                                    message.reply(`you must include a prefix.`);
                                } else {
                                    if (args[2].length > 4) {
                                        message.reply(`the prefix cannot be longer than 4 characters.`);
                                    } else {
                                        if (rows.length < 1) {
                                            sql = `INSERT INTO ${client.config.Config_Table} (guild, prefix) VALUES ('${message.guild.id}', '${args[2]}')`;
                                        } else {
                                            sql = `UPDATE ${client.config.Config_Table} SET prefix = '${args[2]}' WHERE guild = '${message.guild.id}'`;
                                        }
                                        message.guild.members.get(client.config.botID).setNickname(`${client.config.botName} [${args[2]}]`);
                                        message.channel.send(`My Prefix has been set to ${args[2]}`);
                                        con.query(sql);
                                    }
                                }
                            } else {
                                if (args[1] == "logchannel") {
                                    if (rows.length < 1) {
                                        sql = `INSERT INTO ${client.config.Config_Table} (guild, log_channel) VALUES ('${message.guild.id}', '${message.mentions.channels.first().id}')`;
                                    } else {
                                        sql = `UPDATE ${client.config.Config_Table} SET log_channel = '${message.mentions.channels.first().id}' WHERE guild = '${message.guild.id}'`;
                                    }
                                    message.channel.send(`My logging channel has been set to <#${message.mentions.channels.first().id}>`);
                                    con.query(sql);
                                } else {
                                    if (args[1] == "eventchannel") {
                                        if (rows.length < 1) {
                                            sql = `INSERT INTO ${client.config.Config_Table} (guild, event_channel) VALUES ('${message.guild.id}', '${message.mentions.channels.first().id}')`;
                                        } else {
                                            sql = `UPDATE ${client.config.Config_Table} SET event_channel = '${message.mentions.channels.first().id}' WHERE guild = '${message.guild.id}'`;
                                        }
                                        message.channel.send(`My user events channel has been set to <#${message.mentions.channels.first().id}>`);
                                        con.query(sql);
                                    } else {
                                        if (args[1] == "welcomemsg") {
                                            if (rows.length < 1) {
                                                sql = `INSERT INTO ${client.config.Config_Table} (guild, welcome_msg) VALUES ('${message.guild.id}', "${msg}")`;
                                            } else {
                                                sql = `UPDATE ${client.config.Config_Table} SET welcome_msg = "${msg}" WHERE guild = '${message.guild.id}'`;
                                            }
                                            message.channel.send(`My welcome message has been set to ${msg}`);
                                            con.query(sql);
                                        } else {
                                            if (args[1] == "leavemsg") {
                                                if (rows.length < 1) {
                                                    sql = `INSERT INTO ${client.config.Config_Table} (guild, leave_msg) VALUES ('${message.guild.id}', "${msg}")`;
                                                } else {
                                                    sql = `UPDATE ${client.config.Config_Table} SET leave_msg = "${msg}" WHERE guild = '${message.guild.id}'`;
                                                }
                                                message.channel.send(`My leave message has been set to ${msg}`);
                                                con.query(sql);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (args[0] == "reset") {
                            if (!args[1]) {
                                let embed = new Discord.RichEmbed()
                                    .setTitle("Error Performing Command")
                                    .setColor("0xF00000")
                                    .addField("Reason", "Missing Argument")
                                    .addField("Usages", `${prefix}config reset prefix\n` +
                                        `${prefix}config reset logChannel\n` +
                                        `${prefix}config reset eventChannel\n` +
                                        `${prefix}config reset welcomeMsg\n` +
                                        `${prefix}config reset leaveMsg`, true)
                                message.channel.send(embed);
                            }
                            if (args[1] == "prefix") {
                                if (!sqlPrefix) {
                                    message.reply(`there is no custom prefix to reset.`);
                                } else {
                                    if (!logChannel && !eventChannel && !welcomeMsg && !leaveMsg) {
                                        sql = `DELETE FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`;
                                        message.guild.members.get(client.config.botID).setNickname(`${client.config.botName}`);
                                        message.channel.send(`Custom prefix has been reset.`);
                                        con.query(sql);
                                    } else {
                                        sql = `UPDATE ${client.config.Config_Table} SET prefix = DEFAULT WHERE guild = '${message.guild.id}'`;
                                        message.guild.members.get(client.config.botID).setNickname(`${client.config.botName}`);
                                        message.channel.send(`Custom prefix has been reset.`);
                                        con.query(sql);
                                    }
                                }
                            } else {
                                if (args[1] == "logchannel") {
                                    if (!logChannel) {
                                        message.reply(`there is no custom log channel to reset.`);
                                    } else {
                                        if (!sqlPrefix && !eventChannel && !welcomeMsg && !leaveMsg) {
                                            sql = `DELETE FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`;
                                            message.channel.send(`Custom logging channel has been reset.`);
                                            con.query(sql);
                                        } else {
                                            sql = `UPDATE ${client.config.Config_Table} SET log_channel = DEFAULT WHERE guild = '${message.guild.id}'`;
                                            message.channel.send(`Custom logging channel has been reset.`);
                                            con.query(sql);
                                        }
                                    }
                                } else {
                                    if (args[1] == "eventchannel") {
                                        if (!eventChannel) {
                                            message.reply(`there is no custom event channel to reset.`);
                                        } else {
                                            if (!sqlPrefix && !logChannel && !welcomeMsg && !leaveMsg) {
                                                sql = `DELETE FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`;
                                                message.channel.send(`Custom user events channel has been reset.`);
                                                con.query(sql);
                                            } else {
                                                sql = `UPDATE ${client.config.Config_Table} SET event_channel = DEFAULT WHERE guild = '${message.guild.id}'`;
                                                message.channel.send(`Custom user events channel has been reset.`);
                                                con.query(sql);
                                            }
                                        }
                                    } else {
                                        if (args[1] == "welcomemsg") {
                                            if (!welcomeMsg) {
                                                message.reply(`there is no custom welcome message to reset.`);
                                            } else {
                                                if (!sqlPrefix && !logChannel && !eventChannel && !leaveMsg) {
                                                    sql = `DELETE FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`;
                                                    message.channel.send(`Custom welcome message has been reset.`);
                                                    con.query(sql);
                                                } else {
                                                    sql = `UPDATE ${client.config.Config_Table} SET welcome_msg = DEFAULT WHERE guild = '${message.guild.id}'`;
                                                    message.channel.send(`Custom welcome message has been reset.`);
                                                    con.query(sql);
                                                }
                                            }
                                        } else {
                                            if (args[1] == "leavemsg") {
                                                if (!leaveMsg) {
                                                    message.reply(`there is no custom leave message to reset.`);
                                                } else {
                                                    if (!sqlPrefix && !logChannel && !eventChannel && !welcomeMsg) {
                                                        sql = `DELETE FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`;
                                                        message.channel.send(`Custom leave message has been reset.`);
                                                        con.query(sql);
                                                    } else {
                                                        sql = `UPDATE ${client.config.Config_Table} SET event_channel = DEFAULT WHERE guild = '${message.guild.id}'`;
                                                        message.channel.send(`Custom leave message has been reset.`);
                                                        con.query(sql);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (args[0] == "clear") {
                                if (rows.length == 0) {
                                    message.reply("there is no custom config to clear.");
                                } else {
                                    sql = `DELETE FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`;
                                    message.guild.members.get(client.config.botID).setNickname(`${client.config.botName}`);
                                    message.channel.send(`All custom set configs have been cleared.`);
                                    con.query(sql);
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}