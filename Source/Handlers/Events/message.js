const chalk = require('chalk');
const logger = require('../../Monitor/console-monitor.js');

module.exports = (client, message, con) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  con.query(`SELECT * FROM ${client.config.Config_Table} WHERE guild = '${message.guild.id}'`, (error, rows) => {
    if (error) {
      console.log(error);
    }

    let prefix;

    if (rows[0]) {
      if (rows[0].prefix) {
        prefix = rows[0].prefix;
      } else {
        prefix = client.config.prefix;
      }
    } else {
      prefix = client.config.prefix;
    }

    // mySQL Handling
    require('../mySQL/ranking.js')(client, message, con);

    if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
      client.commands.get(command)(client, message, args, con, prefix);

      // Remove this line if you do not wish to show all the commands ran by users.
      logger(`${message.author.tag} ran the command ` + chalk.green(`${command}`) + ` in ${message.guild.name}`, "cmdRan")
    }
  })
};