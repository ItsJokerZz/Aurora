const Discord = require("discord.js")
let cpuStat = require("cpu-stat")

module.exports.run = async (client, message, args) => {
    cpuStat.usagePercent(function (err, percent) {
        if (err) {
            return console.log(err);
        }

        let totalSeconds = process.uptime();
        let secs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);

        var Bot = require('../../bot.js');

        let embed = new Discord.RichEmbed()
            .setColor("0x9400d3")
            .setAuthor("JokerZzBot's Information", "https://cdn.discordapp.com/app-icons/509956886041329665/e07efbfe762d0da99d4584e37d6f00e1.png")
            .addField(":notepad_spiral: Info", 'Branch: \`Master\`\nLibrary: \`Discord.JS\`\nPrefix: \`j-\`', true)
            .addField(":robot: Stats", `Members: \`${client.users.size - 1}\`\nChannels: \`${client.channels.size}\`\nGuilds: \`${client.guilds.size}\``, true)
            .addField(":cloud: Cloud", `Uptime:  \`${days}D ${hours}H ${mins}M ${secs}S\`\nCPU Load: \`${percent.toFixed(2)}%\`\nMemory: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
            .addBlankField()
            .addField(":earth_americas: Links", "GitHub: [Here](https://github.com/ItsJokerZz/JokerZzBot)\nInvite: [Here](https://discordapp.com/oauth2/authorize?client_id=509956886041329665&scope=bot&permissions=2146958591)\nServer: [Here](https://discord.gg/xy76XSb)\nBot Site: [Here](https://itsjokerzz.tk/bot)\nHosting: [Here](https://aws.amazon.com/)\nVote: [Here](https://discordbots.org/bot/509956886041329665)", true)
            .addField("\n 󠀀󠀀\n 󠀀󠀀\n 󠀀󠀀\n 󠀀󠀀\n 󠀀󠀀\n:arrow_forward: Contributors", "Written, developed, and designed by `ItsJokerZz#3022`", true)
            .setFooter(Bot.start)
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "info"
}