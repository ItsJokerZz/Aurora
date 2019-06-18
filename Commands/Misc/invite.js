const Discord = require("discord.js");

module.exports = (client, message, args) => {
    let embed = new Discord.RichEmbed()
        .setColor("0x9400d3")
        .addField("Aurora", "[Invite Now!](https://discordapp.com/oauth2/authorize?client_id=509956886041329665&scope=bot&permissions=2146958591)", true)
        .addField("Support Server", "[Join Now!](https://discord.gg/xy76XSb)", true)
    message.channel.send(embed);
}