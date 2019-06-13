const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.channel.send({
        embed: {
            color: 0x9400d3,
            title: `Pong! :ping_pong: Aurora replied within... ${Math.round(client.ping)}ms.`
        }
    });
}

module.exports.help = {
    name: "ping"
}