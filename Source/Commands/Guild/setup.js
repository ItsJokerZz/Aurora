const Discord = require("discord.js");

// Add remove and create args

module.exports = async (client, message, args, con, prefix) => {
    let logChannel = message.guild.channels.find(channel => channel.name === "logs");
    let eventChannel = message.guild.channels.find(channel => channel.name === "welcome-leave");
    let mutedRole = message.guild.roles.find(role => role.name === "Muted");
    let summary;

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("you must be able to manage messages to use this command!");
    } else {
        if (args[0] == "usage") {
            let embed = new Discord.RichEmbed()
            .setColor("0x0AA0A0")
            .addField("Usages", `${prefix}usage - this command\n${prefix}setup - creates all the necessities like channels, ect.\n${prefix}setup undo - removes all the created channels and roles`, true)
        message.channel.send(embed);
        } else {
            if (!args[0]) {
                if (logChannel && eventChannel && mutedRole) {
                    message.channel.send("The setup has already been ran therefore, you may not run it again.")
                } else {
                    if (!logChannel && !eventChannel && !mutedRole) {
                        message.guild.createChannel("logs");
                        message.guild.createChannel("welcome-leave");
                        try {
                            muteRole = await message.guild.createRole({
                                name: "Muted",
                                color: "#000000",
                                permissions: []
                            })
                            message.guild.channels.forEach(async (channel) => {
                                await channel.overwritePermissions(muteRole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    CONNECT: false
                                });
                            })
                        } catch (error) {}

                        summary = "- Created logs channel\n" +
                            "- Created welcome-leave channel\n" +
                            "- Created mute role"

                        let embed = new Discord.RichEmbed()
                            .setColor("0x0AA0A0")
                            .setTitle("Summary")
                            .setDescription(summary)
                        message.channel.send(embed);

                    } else {
                        if (!logChannel) {
                            summary = "- Created logs channel\n";
                            message.guild.createChannel("logs");
                        }

                        if (!eventChannel) {
                            if (summary == "- Created logs channel\n") {
                                summary = "- Created logs channel\n- Created welcome-leave channel\n";
                            } else {
                                summary = "- Created welcome-leave channel\n"
                            }
                            message.guild.createChannel("welcome-leave");
                        }

                        if (!mutedRole) {
                            if (summary == "- Created logs channel\n- Created welcome-leave channel\n") {
                                summary = "- Created logs channel\n- Created welcome-leave channel\n- Created Muted role"
                            } else {
                                summary = "- Created Muted role\n"
                            }

                            try {
                                muteRole = await message.guild.createRole({
                                    name: "Muted",
                                    color: "#000000",
                                    permissions: []
                                })
                                message.guild.channels.forEach(async (channel) => {
                                    await channel.overwritePermissions(muteRole, {
                                        SEND_MESSAGES: false,
                                        ADD_REACTIONS: false,
                                        CONNECT: false
                                    });
                                })
                            } catch (error) {}
                        }
                        let embed = new Discord.RichEmbed()
                            .setColor("0x0AA0A0")
                            .setTitle("Summary")
                            .setDescription(summary)
                        message.channel.send(embed);
                    }
                }
            } else {
                if (args[0] == "undo") {
                    if (logChannel && eventChannel && mutedRole) {
                        logChannel.delete();
                        eventChannel.delete();
                        mutedRole.delete();

                        summary = "- Removed logs channel\n" +
                            "- Removed welcome-leave channel\n" +
                            "- Removed muted role"

                        let embed = new Discord.RichEmbed()
                            .setColor("0x0AA0A0")
                            .setTitle("Summary")
                            .setDescription(summary)
                        message.channel.send(embed);
                    } else {
                        if (logChannel) {
                            summary = "- Removed logs channel\n";
                            logChannel.delete();
                        }

                        if (eventChannel) {
                            if (summary == "- Removed logs channel\n") {
                                summary = "- Removed logs channel\n- Removed welcome-leave channel\n";
                            } else {
                                summary = "- Removed welcome-leave channel\n"
                            }
                            eventChannel.delete();
                        }

                        if (mutedRole) {
                            if (summary == "- Removed logs channel\n- Removed welcome-leave channel\n") {
                                summary = "- Removed logs channel\n- Removed welcome-leave channel\n- Removed muted role"
                            } else {
                                summary = "- Removed muted role\n"
                            }
                            mutedRole.delete();
                        }
                        let embed = new Discord.RichEmbed()
                            .setColor("0x0AA0A0")
                            .setTitle("Summary")
                            .setDescription(summary)
                        message.channel.send(embed);
                    }
                }
            }
        }
    }
}