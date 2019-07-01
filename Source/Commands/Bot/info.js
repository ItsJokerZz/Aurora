const Discord = require('discord.js');
const cpuStat = require("cpu-stat");

module.exports = (client, message, args) => {
    cpuStat.usagePercent(function (error, percent) {
       
            let uptime = process.uptime();
            let secs = Math.floor(uptime % 60);
            let days = Math.floor((uptime % 31536000) / 86400);
            let hours = Math.floor((uptime / 3600) % 24);
            let mins = Math.floor((uptime / 60) % 60);

            let embed = new Discord.RichEmbed()
                .setColor("0x0AA0A0")
                .setAuthor(`${client.config.botName}'s Statistics`, client.user.avatarURL)
                .addField(":robot: Stats", `Total Humans: \`${client.users.filter(filter => !filter.bot).size}\`\nTotal Channels: \`${client.channels.size}\`\nTotal Servers: \`${client.guilds.size}\``, true)
                .addField(":beginner: Information", `Discord.Js: \`v11.5.1\`\nNode: \`v10.15.3\`\nCommands: \`${client.commands.size}\``, true)
                .addField(":cloud: Cloud", `Uptime: \`${days}D ${hours}H ${mins}M ${secs}S\`\nCPU Load: \`${percent.toFixed(2)}%\`\nMemory: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
                .setDescription(` 󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀  󠀀󠀀 󠀀󠀀Written by [${client.config.owner}](https://www.github.com/itsjokerzz) with the help of various sources.`)
                message.channel.send(embed);
    });
}