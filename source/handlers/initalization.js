const fs = require("fs");
const logging = require("../handlers/console-log.js");

function loadEvents(client, total = 0) {
  logging.newLine("Loading Events...".bold.italic, true);
  try {

    const events = fs.readdirSync("./source/events/").filter((file) => file.endsWith(".js"));

    for (const file of events) {
      const event = require(`../events/${file}`);

      if (event.name) client.events.set(event.name, event);
      total++;

      logging.dropDown(`${file}`);
    }

    const message = total < 2 ? "1 event initialized." : `${total} events initialized.`;
    logging.newLine(message.bold.italic);
  } catch (error) {
    logging.error(error.message);
  }
}

function loadCommands(client, total = 0) {
  logging.newLine("Loading Commands...".bold.italic, true);

  try {
    const folders = fs.readdirSync("./source/commands/");

    for (const folder of folders) {
      const commands = fs.readdirSync(`./source/commands/${folder}/`).filter((file) => file.endsWith(".js"));

      for (const file of commands) {
        const command = require(`../../source/commands/${folder}/${file}`);

        if (command.name) client.commands.set(command.name, command);
        if (command.aliases) {
          command.aliases.forEach(alias => {
            client.aliases.set(alias, command.name);
          });
        }

        logging.dropDown(`${folder} \\ ${file}`);

        total++;
      }
    }

    const message = total < 2 ? "1 command initialized." : `${total} commands initialized.`;
    logging.newLine(message.bold);
  } catch (error) {
    logging.error(error.message);
  }
}

function showAsciiLogo(client) {
  const array = fs.readFileSync('./source/ascii-logo.txt', 'utf-8').split("\n");

  if (client.config.showAsciiLogo) {
    for (const line of array) {
      console.log(line.rainbow.bold);
    }
  }
}

module.exports = (client) => {
  showAsciiLogo(client);
  require("./mysql/functions.js")(client, logging);
  loadEvents(client);
  loadCommands(client);
};