const Discord = require("discord.js");

let recent = new Set();

module.exports.run = async (client, message, args, con) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) || message.author;

    con.query(`SELECT * FROM jokerzzbot WHERE id = '${user.id}'`, (err, rows) => {

        const msg = args.join(" ");

        if (rows[0].blocked == "1") {
            message.channel.send({
                embed: {
                    color: 0x9400d3,
                    title: "**You have been blacklisted from using this command.**",
                    description: `Contact ItsJokerZz#3022 for more information.`
                }
            })
        } else if (recent.has(user.id)) {
            message.channel.send({
                embed: {
                    color: 0x9400d3,
                    title: "You must wait 30 minutes before using this command again!"
                }
            })
            if (!args[0]) {
                let embed = new Discord.RichEmbed()
                    .setColor("0x9400d3")
                    .setTitle("You must include a message!\nExample: j-support The help command is broken.")
                message.channel.send(embed);
            }
        } else {
            client.users.get("238216765623107584").send({
                embed: {
                    color: 0x9400d3,
                    title: "Support Message",
                    description: `Username\n${user.username}#${user.discriminator}\n\nUsers ID\n${user.id}\n\n\nMessage\n${msg}`
                }
            })
            message.channel.send({
                embed: {
                    color: 0x9400d3,
                    author: {
                        name: "Contacted ItsJokerZz",
                        icon_url: "https://cdn.discordapp.com/app-icons/509956886041329665/e07efbfe762d0da99d4584e37d6f00e1.png"
                    },
                    title: "He will reply ASAP please be patient.",
                    description: "If you abuse this you will be blacklisted from using this command!\nOh and sorry for the inconvenience if you have had a problem. :heart:"
                }
            });
            recent.add(user.id);
        }
    })    

    setTimeout(() => {
        recent.delete(user.id);
    }, 1800000);
}

module.exports.help = {
    name: "support"
}