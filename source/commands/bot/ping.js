const {
    EmbedBuilder
} = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["latency", "delay", "responce"],

    run: async (client, message) => {
        const msg = await message.reply("Pinging...")

        const embed = new EmbedBuilder()
            .setColor(0x0AA0A0)
            .setTitle("Latency Information")
            .addFields({
                name: "🤖 Client (Message)",
                value: `** ${new Date().getTime() - msg.createdTimestamp} ms ⌛**`,
                inline: true
            }, {
                name: "🖥️ API (Discord)",
                value: `**${client.ws.ping} ms ⌛**`,
                inline: true
            }).setFooter({
                text: "Results MAY vary depending on area, usage, time, etc."
            })

        msg.delete().then(() => {
            message.channel.send({
                embeds: [embed]
            })
        })
    }
}