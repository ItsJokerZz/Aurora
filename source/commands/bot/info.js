const {
    EmbedBuilder
} = require("discord.js")

const cpuStat = require("cpu-stat")
const pkg = require("../../../package.json")

module.exports = {
    name: "info",

    run: async (client, message, ) => {
        cpuStat.usagePercent(function (error, percent) {

            var uptime = process.uptime()
            var secs = Math.floor(uptime % 60)
            var days = Math.floor((uptime % 31536000) / 86400)
            var hours = Math.floor((uptime / 3600) % 24)
            var mins = Math.floor((uptime / 60) % 60)

            const embed = new EmbedBuilder()
                .setColor(0x0AA0A0)
                .setAuthor({
                    name: `${client.config.name}'s Statistics`,
                    iconURL: `${client.user.avatarURL()}`
                })
                .setDescription(`Written by [${client.config.creatorTag}](https://www.github.com/itsjokerzz) with the help of various sources.`)
                .addFields({
                    name: ":robot: Stats",
                    value: `Humans: \`${client.users.cache.filter(filter => !filter.bot).size}\`\nServers: \`${client.guilds.cache.size}\`\nChannels: \`${client.channels.cache.size}\``,
                    inline: true
                }, {
                    name: ":beginner: Information",
                    value: `Commands: \`${client.commands.size}\`\nNode.Js: \`${pkg.dependencies["node"].replace("^", "v")}\`\nDiscord.Js: \`${pkg.dependencies["discord.js"].replace("^", "v")}\``,
                    inline: true
                }, {
                    name: ":cloud: Server (RPi 4B+)",
                    value: `Uptime: \`${days}D ${hours}H ${mins}M ${secs}S\`\nCPU Load: \`${percent.toFixed(2)} %\`\nMemory: \`${Math.round((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))}MB / 8GB\``,
                    inline: true
                })

            message.channel.send({
                embeds: [embed]
            })
        })
    }
}