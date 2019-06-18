module.exports = (client, message, args, con) => {
    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) || message.author;

    con.query(`SELECT * FROM ${client.config.XP_Table} WHERE id = '${target.id}'`, (error, rows) => {

        if (error) {
            logger(`${(error)}\n`, "critical");
        } else {
            if (!rows[0]) return message.channel.send({
                embed: {
                    color: 0x9400d3,
                    title: `**${target.displayName} has no stats on record.**`
                }
            })

            let xp = rows[0].xp;
            let lvl = null;
            let nxtLvl = null;
            let nxtXP = null;
            let needXP = null;
            let msgs = rows[0].msgs;

            if (xp <= 3750) {
                lvl = "1"
                nxtLvl = "5"
                nxtXP = "3750"
                needXP = nxtXP - xp
            }
            if (xp >= 3750) {
                lvl = "5"
                nxtLvl = "10"
                nxtXP = "5000"
                needXP = nxtXP - xp
            }
            if (xp >= 5000) {
                lvl = "10"
                nxtLvl = "15"
                nxtXP = "7500"
                needXP = nxtXP - xp
            }
            if (xp >= 7500) {
                lvl = "15"
                nxtLvl = "20"
                nxtXP = "10000"
                needXP = nxtXP - xp
            }
            if (xp >= 10000) {
                lvl = "20"
                nxtLvl = "25"
                nxtXP = "12500"
                needXP = nxtXP - xp
            }
            if (xp >= 12500) {
                lvl = "25 (MAX)"
                nxtLvl = "NONE"
                nxtXP = "NONE"
                needXP = "NONE"
            }

            if (target.id == message.author.id) return message.channel.send({
                embed: {
                    color: 0x9400d3,
                    title: `Current Level: ${lvl}\nCurrent XP: ${xp}\n\nNext Level: ${nxtLvl}\nNeeded XP: ${needXP}\n\nMessages Sent: ${msgs}`
                }
            })
            else {
                message.channel.send({
                    embed: {
                        color: 0x9400d3,
                        title: `**${target.displayName}\n\nCurrent Level: ${lvl}\nCurrent XP: ${xp}\n\nNext Level: ${nxtLvl}\nNeeded XP: ${needXP}\n\n Messages Sent: ${msgs}**`
                    }
                })
            }
        }
    });
}