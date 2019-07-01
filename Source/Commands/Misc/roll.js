const Discord = require("discord.js");

module.exports = (client, message, args) => {
    var result = Math.floor((Math.random() * 6) + 1);
    message.channel.send({
        embed: {
            color: 0x0AA0A0,
            title: `:game_die: You rolled a... ${result}.`
        }
    });
}