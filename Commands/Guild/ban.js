const Discord = require("discord.js");

module.exports = (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let channel = message.guild.channels.find(channel => channel.name === "bot-logs");
  let reason = args.join(" ").slice(22);

  if (!args[0]) return message.channel.send({
    embed: {
      color: 0x9400d3,
      description: "You must specify a user!"
    }
  })

  if (args[0] == message.author) return message.channel.send({
    embed: {
      color: 0x9400d3,
      description: "You cannot ban yourself!"
    }
  });

  if (user.hasPermission("ADMINISTRATOR")) return message.channel.send({
    embed: {
      color: 0x9400d3,
      description: `<@${message.author.id}> You cannot ban an administrator!`
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
      if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
        embed: {
          color: 0x9400d3,
          description: `<@${message.author.id}> You must be able to ban members to use this command!`
        }
      })
    }

    if (!args[1]) {
      let embed = new Discord.RichEmbed()
        .setColor("#0x9400d3")
        .setDescription("You must include a reason.")
      message.channel.send(embed);
    } else {

      let embed = new Discord.RichEmbed()
        .setColor("#0x9400d3")
        .addField("Banned User", `${user}`)
        .addField("Banned By", `<@${message.author.id}>`)
        .addField("Banned In", message.channel)
        .addField("Reason", reason);

      if (channel) {
        channel.send(embed);
        message.guild.member(user).ban(reason);
      } else {
        if (!channel) {
          embed.setDescription("Log messages will be sent in the channel the command was ran.\n" +
          "If you wish to change that create a channel called bot-logs.");
          message.channel.send(embed);
          message.guild.member(user).ban(reason);
        }
      }
    }
  }
}