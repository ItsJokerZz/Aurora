const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    var result = Math.floor((Math.random() * 6) + 1);
    message.channel.send({
        embed: {
            color: 0x9400d3,
            title: `:game_die: You rolled a... ${result}.`
        }
    });
}

module.exports.help = {
    name: "roll"
}