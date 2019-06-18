const Discord = require("discord.js")

module.exports = async (client, message, args) => {

    const embed = new Discord.RichEmbed()
        .setColor(0x9400d3)
        .setTitle("Command List\n\n")
        .setDescription("**Assistance Commands [❓]**\n**Guild Commands [🛠]**\n**Misc Commands [🗒]**\n**Utility Commands [🤖]**")
        .setFooter("React to this message with the commands respected emoji.")

    message.channel.send(embed).then(msg => {
        msg.react('🏠').then(r => {
            msg.react('❓').then(r => {
                msg.react('🛠').then(r => {
                    msg.react('🗒').then(r => {
                        msg.react('🤖').then(r => {
                            msg.react('🗑')

                            const helpFilter = (reaction, user) => reaction.emoji.name === '❓' && user.id === message.author.id;
                            const homeFilter = (reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id;
                            const guildFilter = (reaction, user) => reaction.emoji.name === '🛠' && user.id === message.author.id;
                            const miscFilter = (reaction, user) => reaction.emoji.name === '🗒' && user.id === message.author.id;
                            const utilityFilter = (reaction, user) => reaction.emoji.name === '🤖' && user.id === message.author.id;
                            const removeFilter = (reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id;

                            const help = msg.createReactionCollector(helpFilter, {
                                time: 300000
                            });

                            const home = msg.createReactionCollector(homeFilter, {
                                time: 300000
                            });

                            const guild = msg.createReactionCollector(guildFilter, {
                                time: 300000
                            });

                            const misc = msg.createReactionCollector(miscFilter, {
                                time: 300000
                            });

                            const utility = msg.createReactionCollector(utilityFilter, {
                                time: 300000
                            });

                            const remove = msg.createReactionCollector(removeFilter, {
                                time: 300000
                            });

                            home.on('collect', r => {
                                embed.setTitle("Help Commands\n\n")
                                .setDescription("**Assistance Commands [❓]**\n**Guild Commands [🛠]**\n**Misc Commands [🗒]**\n**Utility Commands [🤖]**")
                                embed.setFooter("React to this message with the commands respected emoji.")
                                msg.edit(embed)
                            })
                            
                            help.on('collect', r => {
                                embed.setTitle("Utility Commands");

                                embed.setDescription("**Help**\n" +
                                    "Displays a list of all the available commands.\n\n" +

                                    '**Support <Message>**\n' +
                                    'DMs ItsJokerZz with your username and discriminator along with your message.')
                                embed.setFooter("")
                                msg.edit(embed)
                            })

                            guild.on('collect', r => {
                                embed.setTitle("Guild Commands");

                                embed.setDescription("**Ban <@User> <Reason>**\n" +
                                    "Bans a member from the server.\n\n" +

                                    "**Kick <@User> <Reason>**\n" +
                                    "Kicks a member from the server.\n\n" +

                                    "**Mute <@User>**\n" +
                                    "Mutes a member from the server.\n\n" +

                                    "**Purge <2-100>**\n" +
                                    "Deletes a defined amount of messages.\n\n" +

                                    "**Unmute <@User>**\n" +
                                    "Unmutes a member from the server.\n\n" +

                                    '**Report <@User> <Reason>**\n' +
                                    'Reports a user so one of the admin/mods can look into a kick, ban, warn, or mute.\n\n')

                                embed.setFooter("")
                                msg.edit(embed)
                            })

                            misc.on('collect', r => {
                                embed.setTitle("Misc Commands");

                                embed.setDescription("**8ball <Question>**\n" +
                                    "Answers all of your questions.\n\n" +

                                    "**Flip**\n" +
                                    "Flips a coin and give you the results.\n\n" +

                                    "**Roll**\n" +
                                    "Rolls a dice and gives you the results.\n\n" +

                                    "**Tweet <@Username / Username> <Message>**\n" +
                                    "Sends an image of a fake tweet from the specified user along with the message.\n\n" +

                                    '**Invite**\n' +
                                    'Sends the bot\'s invite link with ItsJokerZz\'s sever invite.\n\n');

                                embed.setFooter("")
                                msg.edit(embed)
                            })

                            utility.on('collect', r => {
                                embed.setTitle("Utility Commands");

                                embed.setDescription("**Ping**\n" +
                                    "Displays how many MS it took for the bot to reply.\n\n" +

                                    "**Info**\n" +
                                    "Displays information about the bot.\n\n")

                                embed.setFooter("")
                                msg.edit(embed)
                            })

                            remove.on('collect', r => {
                                async function clear() {
                                    msg.delete(embed);
                                    const fetched = await msg.channel.fetchMessages({
                                        limit: 2
                                    });
                                    msg.channel.bulkDelete(fetched);
                                }
                                clear();
                            })
                        })
                    })
                })
            })
        })
    })
}

module.exports.help = {
    name: "help"
}