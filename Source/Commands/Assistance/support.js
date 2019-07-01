const Discord = require('discord.js');
const moment = require('moment');

let recent = new Set();

module.exports = (client, message, args, con, prefix) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) || message.author;
    let date = moment().format('LLLL');
    let msg = args.join(" ");

    if (recent.has(user.id)) {
        message.channel.send("You must wait 5 minutes before using this command again!");
    } else {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setTitle("Error Performing Command")
                .setColor("0xF00000")
                .addField("Reason", "Missing Argument")
                .addField("Usage", `${prefix}support <message>`)
                .addField("Example", `${prefix}support The help command is broken.`)
            message.channel.send(embed);
        } else {
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setColor(0x0AA0A0)
                .addField("Username:", `${message.author.username}#${message.author.discriminator}`, true)
                .addField("User's ID:", message.author.id, true)
                .addField("Message:", `\`\`\`${msg}\`\`\``)
                .addField("Server:", message.guild.name, true)
                .addField("Date", date, true)
            client.users.get(client.config.ownerID).send(embed);

            let embed2 = new Discord.RichEmbed()
                .setColor(0x0AA0A0)
                .setAuthor(`Contacted ${client.config.owner}`, "https://cdn.discordapp.com/avatars/238216765623107584/39a738f20b7934e86b34b0b261fa4b29.png") // Your avatar URL
                .addField("He will reply ASAP please be patient.", "If you abuse this you will be blacklisted from using this command!\nOh and sorry for the inconvenience if you have had a problem. :heart:")
            message.channel.send(embed2);

            recent.add(user.id);
        }
    }
    setTimeout(() => {
        recent.delete(user.id);
    }, 300000);
}