const Discord = require("discord.js");

let recent = new Set();

module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let channel = message.guild.channels.find(channel => channel.name === "bot-logs");
    let reason = args.join(" ").slice(22);

    if (!args[0]) return message.channel.send({
        embed: {
            color: 0x9400d3,
            description: "You must specify a user!"
        }
    })

    if (args[0] == message.author) return message.channel.send({
        embed: {
            color: 0x9400d3,
            description: "You cannot warn yourself!"
        }
    });

    if (user.hasPermission("ADMINISTRATOR")) return message.channel.send({
        embed: {
            color: 0x9400d3,
            description: `<@${message.author.id}> You cannot report an administrator!`
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
            if (recent.has(user.id)) {
                message.channel.send({
                    embed: {
                        color: 0x9400d3,
                        title: "You must wait 5 minutes before using this command again!"
                    }
                })
            }
            if (!args[1]) {
                let embed = new Discord.RichEmbed()
                    .setColor("#0x9400d3")
                    .setDescription("You must include a reason.")
                message.channel.send(embed);
            } else {
                let embed = new Discord.RichEmbed()
                    .setColor("#0x9400d3")
                    .addField("Reported User", `${user}`)
                    .addField("Reported By", `<@${message.author.id}>`)
                    .addField("Reported In", message.channel)
                    .addField("Reason", reason);

                if (channel) {
                    channel.send(embed);
                } else {
                    if (!channel) {
                        embed.setDescription("Log messages will be sent in the channel the command was ran.\n" +
                            "If you wish to change that create a channel called bot-logs.");
                        message.channel.send(embed);
                    }
                }
                recent.add(user.id);
            }
        }
    }
}

setTimeout(() => {
    recent.delete(user.id);
}, 300000);

module.exports.help = {
    name: "report"
}