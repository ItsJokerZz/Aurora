const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let role = message.guild.roles.find(role => role.name === "Muted");
  let channel = message.guild.channels.find(channel => channel.name === "bot-logs");

  if (!args[0]) return message.channel.send({
    embed: {
      color: 0x9400d3,
      description: "You must specify a user!"
    }
  })

  if (args[0] == message.author) return message.channel.send({
    embed: {
      color: 0x9400d3,
      description: "You cannot mute yourself!"
    }
  });

  if (user.hasPermission("ADMINISTRATOR")) return message.channel.send({
    embed: {
      color: 0x9400d3,
      description: `<@${message.author.id}> You cannot mute an administrator!`
    }
  })
  else {
    if (!user) return message.channel.send({
      embed: {
        color: 0x9400d3,
        description: "Cannot find the specifed user."
      }
    })
    else {
      if (!message.member.hasPermission("MUTE_MEMBER")) return message.channel.send({
        embed: {
          color: 0x9400d3,
          description: `<@${message.author.id}> You must be able to mute members to use this command!`
        }
      })
    }
  }

  if (!role) {
    let embed = new Discord.RichEmbed()
      .setColor("#0x9400d3")
      .setTitle("Error Perfoming Command")
      .setDescription("The @Muted role doesnt exist please create it.")
    message.channel.send(embed);
  } else {
    if (!user.roles.has(role.id)) {
      message.channel.send({
        embed: {
          color: 0x9400d3,
          title: "Error Perfoming Command",
          description: "The specified user is not muted."
        }
      })
    } else {

      await user.removeRole(role);

      let embed = new Discord.RichEmbed()
        .setColor("#0x9400d3")
        .addField("Unmuted User", `${user}`)
        .addField("Unmuted By", `<@509956886041329665>`)

      if (channel) {
        channel.send(embed);
      } else {
        if (!channel) {
          embed.setDescription("Log messages will be sent in the channel the command was ran.\n" +
            "If you wish to change that create a channel called bot-logs.");
          message.channel.send(embed);
        }
      }
    }
  }
}

module.exports.help = {
  name: "unmute"
}