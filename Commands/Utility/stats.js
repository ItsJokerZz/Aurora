const Discord = require('discord.js');

let cpuStat = require("cpu-stat");

module.exports = (client, message, args) => {
    cpuStat.usagePercent(function (err, percent) {
        if (err) {
            return console.log(err);
        }

        let totalSeconds = process.uptime();
        let secs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);

        let embed = new Discord.RichEmbed()
            .setColor("0x9400d3")
            .addField(":robot: Stats", `Members: \`${client.users.size}\`\nChannels: \`${client.channels.size}\`\nGuilds: \`${client.guilds.size}\``, true)
            .addField(":cloud: Cloud", `Uptime:  \`${days}D ${hours}H ${mins}M ${secs}S\`\nCPU Load: \`${percent.toFixed(2)}%\`\nMemory: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
            .addField(":beginner: Info", "Written by ItsJokerZz#3022\nDiscord.Js v11.5.1\nNode.Js v10.15.3", true)
        message.channel.send(embed);
    });
}