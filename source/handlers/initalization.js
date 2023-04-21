const fs = require("fs");
const logging = require("../handlers/console-log.js");

function loadEvents(client, total = 0) {
  const events = fs.readdirSync("./source/events/").filter(file => file.endsWith(".js"));
  logging.newLine("Loading Events...".bold.italic, true);

  for (const file of events) {
    const event = require(`../events/${file}`);
    if (event.name) client.events.set(event.name, event);
    logging.dropDown(`${file}`);
    total++;
  }

  logging.newLine(total < 2 ? "1 event initialized." : `${total} events initialized.`.bold.italic);
}

function loadCommands(client, total = 0) {
  const folders = fs.readdirSync("./source/commands/");
  logging.newLine("Loading Commands...".bold.italic, true);

  for (const folder of folders) {
    const commands = fs.readdirSync(`./source/commands/${folder}/`).filter(file => file.endsWith(".js"));
    for (const file of commands) {
      const command = require(`../../source/commands/${folder}/${file}`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases)
        command.aliases.forEach(alias => {
          client.aliases.set(alias, command.name);
        });

      logging.dropDown(`${folder} \\ ${file}`);
      total++;
    }
  }

  logging.newLine(total < 2 ? "1 command initialized." : `${total} commands initialized.`.bold.italic);
}

function showAsciiLogo(client) {
  const array = fs.readFileSync('./source/ascii-logo.txt', 'utf-8').split("\n");
  if (client.config.showAsciiLogo)
    for (const line of array)
      console.log(line.rainbow.bold);
}

module.exports = client => {
  showAsciiLogo(client);
  require("./mysql/functions.js")(client, logging);
  loadEvents(client);
  loadCommands(client);
};