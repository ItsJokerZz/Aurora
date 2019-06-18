const Discord = require("discord.js");

module.exports = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      color: 0x9400d3,
      description: `<@${message.author.id}> **You must be able to manage messages to use this command!**`
    }
  });

  const deleteCount = parseInt(args[0], 10);

  if (!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.channel.send({
      embed: {
        color: 0x9400d3,
        description: `<@${message.author.id}> **Please provide a number between 2 and 100 for the number of messages to delete!**`
      }
    });

  const fetched = await message.channel.fetchMessages({
    count: deleteCount
  });

  try
  {
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send({
        embed: {
          color: 0x9400d3,
          title: "**Error Performing Command**",
          description: `<@${message.author.id}> **Couldn't delete messages because of: ${error}` + "**"
        }
      }))
    }
    finally
    {
      message.channel.send({
        embed: {
          color: 0x9400d3,
          description: `<@${message.author.id}>` + "** has purged " + `${deleteCount}` + " messages.**"
        }
      })
    }
  }