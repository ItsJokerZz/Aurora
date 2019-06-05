const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let channel = message.guild.channels.find(channel => channel.name === "bot-logs");
    let role = message.guild.roles.find(role => role.name === "Muted");

    if (!args[0]) return message.channel.send({
        embed: {
            color: 0x9400d3,
            description: "You must specify a user!"
        }
    })

    if (args[0] == message.author) return message.channel.send({
        embed: {
            color: 0x9400d3,
            description: "You cannot mute yourself!"
        }
    });

    if (user.hasPermission("ADMINISTRATOR")) return message.channel.send({
        embed: {
            color: 0x9400d3,
            description: `<@${message.author.id}> You cannot mute an administrator!`
        }
    })
    else {
        if (!user) return message.channel.send({
            embed: {
                color: 0x9400d3,
                description: "Cannot find the specifed user."
            }
        })
        else {
            if (!message.member.hasPermission("MUTE_MEMBER")) return message.channel.send({
                embed: {
                    color: 0x9400d3,
                    description: `<@${message.author.id}> You must be able to mute members to use this command!`
                }
            })
        }
    }

    if (user.roles.has(role.id)) {
        let embed = new Discord.RichEmbed()
        .setColor("#0x9400d3")
        .setTitle("Error Perfoming Command")
        .setDescription("You cannot mute a user which is already muted.")
        message.channel.send(embed)
    } else {
        if (!role) {
            let embed = new Discord.RichEmbed()
                .setColor("#0x9400d3")
                .setDescription("The @Muted role doesnt exist please create it.")
            message.channel.send(embed);
        }
        if (!args[1]) {

            let embed = new Discord.RichEmbed()
                .setColor("#0x9400d3")
                .addField("Muted User", `${user}`)
                .addField("Muted By", `<@${message.author.id}>`)
                .addField("Muted In", message.channel)

            if (channel) {
                channel.send(embed);
                user.addRole(role.id);
            } else {
                if (!channel) {
                    embed.setDescription("Log messages will be sent in the channel the command was ran.\n" +
                        "If you wish to change that create a channel called bot-logs.");
                    message.channel.send(embed);
                    user.addRole(role.id);

                }
            }
        } else {
            await (user.addRole(role.id));

            let embed = new Discord.RichEmbed()
                .setColor("#0x9400d3")
                .addField("Muted User", `${user}`)
                .addField("Muted By", `<@${message.author.id}>`)
                .addField("Muted In", message.channel)
                .addField("Time Muted for", args[1]);

            if (channel) {
                channel.send(embed);
            } else {
                if (!channel) {
                    embed.setDescription("Log messages will be sent in the channel the command was ran.\n" +
                        "If you wish to change that create a channel called bot-logs.");
                    message.channel.send(embed);
                }
            }

            setTimeout(function () {
                user.removeRole(role.id);
                if (channel) {
                    let embed = new Discord.RichEmbed()
                        .setColor("#0x9400d3")
                        .addField("Unmuted User", `${user}`)
                        .addField("Muted By", `<@509956886041329665>`)
                        .addField("Muted In", message.channel)
                        .addField("Time Muted for", args[1])
                    channel.send(embed);
                } else {
                    if (!channel) {
                        let embed = new Discord.RichEmbed()
                            .setColor("#0x9400d3")
                            .setDescription("Log messages will be sent in the channel the command was ran.\n" +
                                "If you wish to change that create a channel called bot-logs")
                            .setColor("#0x9400d3")
                            .addField("Unmuted User", `${user}`)
                            .addField("Muted By", `<@509956886041329665>`)
                            .addField("Muted In", message.channel)
                            .addField("Time Muted for", args[1])
                        message.channel.send(embed);
                    }
                }
            }, ms(args[1]));
        }
    }
}

module.exports.help = {
    name: "mute"
}