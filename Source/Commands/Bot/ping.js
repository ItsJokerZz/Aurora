const Discord = require('discord.js');

module.exports = (client, message, args) => {
    let date = new Date();
    let time = date.getTime();
    let msgTime = message.createdTimestamp;
    let latency = msgTime - time;

    let embed = new Discord.RichEmbed()
        .setColor("0x0AA0A0")
        .setTitle("Ping Statistics")
        .addField("API Latency", `${Math.round(client.ping)} ms`, true)
        .addField("Client Latency", `${latency} ms`, true)
    message.channel.send(embed);
}