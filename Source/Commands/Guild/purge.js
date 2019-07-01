const Discord = require('discord.js');

module.exports = async (client, message, args, con, prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("you must be able to manage messages to use this command!");
    } else {
        let deleteCount = parseInt(args[0], 10);

        if (!deleteCount) {
            let embed = new Discord.RichEmbed()
                .setTitle("Error Performing Command")
                .setColor("0xF00000")
                .addField("Reason", "Missing Argument")
                .addField("Usage", `${prefix}purge <amount>`, true)
                .addField("Example", `${prefix}purge 50`, true)
            message.channel.send(embed);
        } else {
            if (deleteCount < 2 || deleteCount > 100) {
                message.channel.send("Please provide a number between 2 and 100 for the number of messages to delete!");
            } else {
                let fetched = await message.channel.fetchMessages({
                    count: deleteCount
                });

                try {
                    message.channel.bulkDelete(fetched)
                } finally {
                    message.reply(`has purged ${deleteCount} messages.`)
                }
            }
        }
    }
}