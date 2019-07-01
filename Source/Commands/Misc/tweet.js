const Discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports = async (client, message, args) => {
    const [user, ...restArgs] = args;
    const text = restArgs.join(' ');

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setColor("0x0AA0A0")
            .setTitle("You must include a name and a message!\n")
            .setDescription("Example: j-tweet @ItsJokerZz / ItsJokerZz Hello!")
            .setImage("https://nekobot.xyz/imagegen/3b963543-a691-437d-9cda-57d9308aa853.png")
        message.channel.send(embed);
    } else if (!args[1]) {
        let embed = new Discord.RichEmbed()
            .setColor("0x0AA0A0")
            .setTitle("You must include a message\n")
            .setDescription("Example: j-tweet @ItsJokerZz / ItsJokerZz Hello!")
            .setImage("https://nekobot.xyz/imagegen/3b963543-a691-437d-9cda-57d9308aa853.png")
        message.channel.send(embed);
    } else {
        const {
            body
        } = await snekfetch.get(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user.startsWith("@") ? user.slice(1) : user}&text=${encodeURIComponent(text)}`);

        message.delete();

        let embed = new Discord.RichEmbed()
            .setColor("0x0AA0A0")
            .setTitle(`A tweet from ${user}!`)
            .setImage(body.message)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
            .setTimestamp(message.author.presence.activity)
        message.channel.send(embed);
    }
}