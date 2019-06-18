const chalk = require('chalk');

module.exports = (client, con) => {
  console.log(chalk.cyan(client.ascii.line1));
  console.log(chalk.cyan(client.ascii.line2));
  console.log(chalk.cyan(client.ascii.line3));
  console.log(chalk.cyan(client.ascii.line4));
  console.log(chalk.cyan(client.ascii.line5));
  console.log(chalk.cyan(client.ascii.line6));
  console.log(chalk.cyan(`${client.config.botName} is now ONLINE!`));
  console.log(chalk.cyan(`[Commands]: ${client.commands.size}`));
  console.log(chalk.cyan(`[Servers]: ${client.guilds.size}`));
  console.log(chalk.cyan(`[Users]: ${client.users.size}`));
  console.log(chalk.cyan(`[Channels]: ${client.channels.array().length}\n`));
  client.user.setStatus(`online`)
  var presences = new Array()
  presences[0] = `${client.config.prefix} help`
  presences[1] = `${client.users.size} Users!`
  presences[2] = `${client.guilds.size} Servers!`
  presences[3] = "https://itsjokerzz.tk/"
  presences[4] = "Developed by ItsJokerZz."
  setInterval(() => {
    var random = Math.floor(Math.random() * presences.length)
    client.user.setActivity(`${presences[random]}`, {
      type: `WATCHING`
    })
  }, 10000)

  // mySQL Handling
  const connect = require('./mySQL/connect.js')(con);
  const conLoop = require('./mySQL/conLoop.js')(client, con);
}