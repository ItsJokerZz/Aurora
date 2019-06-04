const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.channel.send({
        embed: {
            color: 0x9400d3,
            description: "**JokerZzBot Invitation: [Here](https://discordapp.com/oauth2/authorize?client_id=509956886041329665&scope=bot&permissions=2146958591)\nServer Invitation: [Here](https://discord.gg/xy76XSb)**"
        }
    });
}

module.exports.help = {
    name: "invite"
}