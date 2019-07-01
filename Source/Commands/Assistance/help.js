const Discord = require("discord.js");

module.exports = async (client, message, args, con, prefix) => {

    let pages = [
        // Main Page
        "[ ❓ ] Assistance Commands\n\n" +
        "[ 🤖 ] Bot Commands\n\n" +
        "[ 🛠 ] Guild Commands\n\n" +
        "[ 🗒 ] Misc Commands",

        // Assistance Page
        "**Help**\n" +
        "Displays a list of all the available commands.\n\n" +

        "**Support <Message>**\n" +
        `DMs ${client.config.owner} with your username and discriminator along with your message.`,

        // Bot Page
        "**Config**\n" +
        `Allows you to configure the bot for your server for more info use ${prefix}config usage\n\n` +

        "**Info**\n" +
        "Displays information about the bot.\n\n" +

        "**Ping**\n" +
        "Displays the bot and the APIs latency.\n\n",

        // Guild Page
        "**Ban <@User> <Reason>**\n" +
        "Bans a member from the server.\n\n" +

        "**Kick <@User> <Reason>**\n" +
        "Kicks a member from the server.\n\n" +

        "**Mute <@User>**\n" +
        "Mutes a member from the server.\n\n" +

        "**Purge <Amount (2 - 100)>**\n" +
        "Deletes a defined amount of messages.\n\n" +

        "**Report <@User>**\n" +
        "Reports a member so that a admin or owner can look into it\n\n" +

        "**Setup**\n" +
        `Allows you to create, remove, or undo the needed channels and roles for the bot for more info use ${prefix}setup usage\n\n` +

        "**Unban <@User>**\n" +
        "Unbans a member from the server.\n\n" +

        "**Unmute <@User>**\n" +
        "Unmutes a member from the server.",

        // Misc Commands
        "**8ball <Question>**\n" +
        "Answers all of your questions.\n\n" +

        "**Invite**\n" +
        "Sends the bot's invite link with ItsJokerZz's sever invite.\n\n" +

        "**Leaderboard**\n" +
        "Displays the top 10 users of the server by XP.\n\n" +

        "**Roll**\n" +
        "Rolls a dice and gives you the results.\n\n" +

        "**Stats**\n" +
        "Lets you check you your or another users stats like XP, level, ect.\n\n" +

        "**TestColor <R G B / HEX>**\n" +
        "Returns an image displaying the values color\n\n" +

        "**Tweet <@Username / Username> <Message>**\n" +
        "Sends an image of a fake tweet from the specified user along with the message."
    ];

    let page = 1;

    let embed = new Discord.RichEmbed()
        .setColor("0x0AA0A0")
        .setTitle("Command List")
        .setDescription(pages[page - 1])
        .setFooter("React to this message with the commands respected emoji.")

    message.channel.send(embed).then(msg => {
        msg.react("🏠").then(r => {
            msg.react("❓").then(r => {
                msg.react("🤖").then(r => {
                    msg.react("🛠").then(r => {
                        msg.react("🗒").then(r => {
                            msg.react("🗑")

                            let mainFilter = (reaction, user) => reaction.emoji.name === "🏠" && user.id === message.author.id;
                            let assistFilter = (reaction, user) => reaction.emoji.name === "❓" && user.id === message.author.id;
                            let botFilter = (reaction, user) => reaction.emoji.name === "🤖" && user.id === message.author.id;
                            let guildFilter = (reaction, user) => reaction.emoji.name === "🛠" && user.id === message.author.id;
                            let miscFilter = (reaction, user) => reaction.emoji.name === "🗒" && user.id === message.author.id;
                            let removeFilter = (reaction, user) => reaction.emoji.name === "🗑" && user.id === message.author.id;

                            let main = msg.createReactionCollector(mainFilter, {
                                time: 60000
                            });

                            let assist = msg.createReactionCollector(assistFilter, {
                                time: 60000
                            });

                            let bot = msg.createReactionCollector(botFilter, {
                                time: 60000
                            });

                            let guild = msg.createReactionCollector(guildFilter, {
                                time: 60000
                            });

                            let misc = msg.createReactionCollector(miscFilter, {
                                time: 60000
                            });

                            let remove = msg.createReactionCollector(removeFilter, {
                                time: 60000
                            });

                            client.on("messageReactionAdd", (messageReaction, user) => {
                                if (user.bot) {
                                    return;
                                } else {
                                    if (messageReaction.message.client.user !== user) {
                                        messageReaction.remove(user);
                                    }
                                }
                            })

                            main.on("collect", r => {
                                page = 1;
                                embed.setTitle("Command List")
                                embed.setDescription(pages[page - 1]);
                                msg.edit(embed);
                            })

                            assist.on("collect", r => {
                                page = 2;
                                embed.setTitle("Assistance Commands")
                                embed.setDescription(pages[page - 1]);
                                embed.setFooter(`Page ${page} of ${pages.length}`);
                                msg.edit(embed);
                            })

                            bot.on("collect", r => {
                                page = 3;
                                embed.setTitle("Bot Commands")
                                embed.setDescription(pages[page - 1]);
                                embed.setFooter(`Page ${page} of ${pages.length}`);
                                msg.edit(embed);
                            })

                            guild.on("collect", r => {
                                page = 4;
                                embed.setDescription(pages[page - 1]);
                                embed.setFooter(`Page ${page} of ${pages.length}`);
                                msg.edit(embed);
                            })

                            misc.on("collect", r => {
                                page = 5;
                                embed.setDescription(pages[page - 1]);
                                embed.setFooter(`Page ${page} of ${pages.length}`);
                                msg.edit(embed);
                            })

                            remove.on("collect", r => {
                                msg.delete(embed);
                            })
                        })
                    })
                })
            })
        })
    })
}