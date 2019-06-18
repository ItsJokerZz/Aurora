const chalk = require('chalk');
const logger = require('../Monitor/console-monitor.js');

module.exports = (client, message, con) => {
  // mySQL Handling
  const XP = require('./mySQL/XP.js')(client, message, con);

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (client.commands.has(command)) {
    client.commands.get(command)(client, message, args, con);

    // Remove this line if you do not wish to show all the commands ran by users.
    logger(`${message.author.tag} ran the command ` + chalk.green(`${command}`) + ` in ${message.guild.name}`, "cmdRan")
  }
};